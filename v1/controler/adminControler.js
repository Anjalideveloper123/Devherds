const { query, response } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltword = 10
const Config = require('../../constant/config')
const Admin = require('../../models/admin')
const Skill = require('../../models/skill')
const User = require('../../models/user')
// const Userskill = require('../../models/userSkill')
const ObjectId = require('mongoose').Types.ObjectId
const Experience = require('../../models/experience')
const Education = require('../../models/education')
const Post = require('../../models/post')
const Job = require('../../models/job')





const adminControler = {
    async register(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltword);
            const userdata = new Admin({
                fullname: req.body.fullname,
                dateofbirth: req.body.dateofbirth,
                gender: req.body.gender,
                email: req.body.email,
                password: hashedPassword,
                dialcode: req.body.dialcode,
                countrycode: req.body.countrycode,
                phonenumber: req.body.phonenumber,
                location: req.body.location
            });
            let result = await userdata.save();

            let token = jwt.sign(
                {
                    id: result._id
                }, "secretKey"

            );
            return res.status(200).json({
                success: true,
                message: Config.USER_SUCCESSFULLY_CREATE,
                data: result,
                token: token
            })
        } catch (err) {

            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async login(req, res) {
        try {
            let { email, password } = req.body;
            let existuser = await Admin.findOne({ email: email }).select('+password')
            if (!existuser) {
                return res.status(404).json({
                    success: false,
                    message: Config.USER_NOT_FOUND
                })
            };
            const matchpassword = await bcrypt.compare(password, existuser.password)
            if (!matchpassword) {
                return res.status(401).json({
                    success: false,
                    message: Config.WRONG_PASSWORD
                })
            }
            let token = jwt.sign(
                {
                    id: existuser._id
                }, "secretKey"

            );
            return res.status(200).json({
                success: true,
                message: Config.USER_LOGGED_SUCCESSFULLY,
                token: token
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async addskill(req, res) {
        try {
            const skill = new Skill({
                name: req.body.name

            })
            await skill.save();
            return res.status(200).json({
                success: true,
                message: Config.SKILL_ADD,
                result: skill
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })

        }
    },

    async updateSkill(req, res) {

        try {
            let id = req.params.id
            let update = {
                name: req.body.name
            }
            const updateSkill = await Skill.findByIdAndUpdate(id, update, { new: true })
            return res.status(200).json({
                success: true,
                message: Config.UPDATE_SKILL,
                data: updateSkill
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getAllSkills(req, res) {
        const filterName = req.query.name
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.limit, 10) || 10;
        let skip = (page - 1) * pageSize

        try {
            const filter = filterName ? { name: new RegExp(filterName, 'i') } : {};

            const skills = await Skill.find(filter)
                // console.log(skills)
                .skip(skip)
                .limit(pageSize)

            const totalSkills = await Skill.countDocuments(filter);

            return res.status(200).json({
                success: true,
                message: Config.FIND_SKILL,
                data: { skills, totalSkills }

            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async getSkills(req, res) {
        const filterName = req.query.name

        try {
            const filter = filterName ? { name: new RegExp(filterName, 'i') } : {};

            const skill = await Skill.find(filter)


            // const skill = await Skill.findById(req.params.id)
            if (!skill) {
                return res.status(404).json({
                    success: false,
                    message: Config.SKILL_NOT_FOUND,

                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: Config.SKILL_FOUND,
                    data: skill
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async deleteSkill(req, res) {
        try {
            let id = req.params.id
            let skill = await Skill.findByIdAndDelete(id)
            if (!skill) {
                return res.status(404).json({
                    success: false,
                    message: Config.NO_SKILL
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: Config.DELETE_SKILL,
                    data: skill
                })
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'


            })
        }
    },
    async getAllUser(req, res) {
        const filterName = req.query.fullname
        const filterEmail = req.query.email
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.limit, 10) || 10;
        let skip = (page - 1) * pageSize

        try {
            const filter = {};
            // const filter = filterName ? { fullname: new RegExp(filterName, 'i') } : {};
            if (filterName) {
                filter.fullname = new RegExp(filterName, 'i')
            };


            if (filterEmail) {

                filter.email = new RegExp(filterEmail, 'i')
            };

            const user = await User.find(filter)

                .skip(skip)
                .limit(pageSize)

            const totalUser = await User.countDocuments(filter);

            return res.status(200).json({
                success: true,
                message: Config.USER_FOUND,
                data: { user, totalUser },

            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getUser(req, res) {
        const filterName = req.query.email
        try {

            const filter = filterName ? { email: new RegExp(filterName, 'i') } : {};

            const user = await User.find(filter)

            // const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.NO_USER
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: Config.FOUND_USER,
                    data: user
                })
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async userSkill(req, res) {
        try {
            console.log(req.params.id);


            const userId = new ObjectId(req.params.id);
            const skill = await User.aggregate([
                { $match: { _id: userId } },
                {
                    "$lookup": {
                        "from": "skills",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            }
                        ],
                        "as": "skills"
                    }
                },
            ])
            return res.status(200).json({
                success: true,
                message: Config.USER_SKILL_FOUND,
                data: skill
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async getExperience(req, res) {
        const filterName = req.query.jobtitle
        try {
            const filter = filterName ? { jobtitle: new RegExp(filterName, 'i') } : {};
            const experience = await Experience.find(filter)

            // const experience = await Experience.findById(req.params.id)
            if (!experience) {
                return res.status(404).json({
                    success: false,
                    message: Config.EXPERIENCE_NOT_FOUND
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: Config.EXPERIENCE_FOUND,
                    data: experience
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async updateExperience(req, res) {
        let id = req.params.id
        try {
            let update = {
                jobtitle: req.body.jobtitle,
                company: req.body.company,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            }
            const updateExperirnce = await Experience.findByIdAndUpdate(id, update, { new: true })
            return res.status(200).json({
                success: true,
                message: Config.UPDATE_EXPERIENCE,
                data: updateExperirnce
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getEducation(req, res) {
        const filterName = req.query.levelofeducation
        try {

            const filter = filterName ? { levelofeducation: new RegExp(filterName, 'i') } : {};
            const education = await Education.find(filter)


            // const education = await Education.findById(req.params.id)
            if (!education) {

                return res.status(404).json({
                    success: false,
                    message: Config.EDUCATION_NOT_FOUND
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: Config.EDUCATION_FOUND,
                    data: education
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async updateEducation(req, res) {
        let id = req.params.id
        try {

            let update = {
                levelofeducation: req.body.levelofeducation,
                institutionname: req.body.institutionname,
                fieldofstudy: req.body.fieldofstudy,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            }
            const updateEducation = await Education.findByIdAndUpdate(id, update, { new: true })
            return res.status(200).json({
                success: true,
                message: Config.UPDATE_EDUCATION,
                data: updateEducation
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getAlldata(req, res) {
        try {
            const userId = req.params.id

            const user = await User.aggregate([
                { $match: { _id: new ObjectId(userId) } },
                // {
                //     "$lookup": {
                //         "from": "userskills",
                //         "let": { "userId": "$_id" },
                //         "pipeline": [
                //             {
                //                 "$match": {
                //                     "$expr": { "$eq": ["$userId", "$$userId"] }
                //                 }
                //             },
                {
                    "$lookup": {
                        "from": "skills",
                        "let": { "skillId": "$skill" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$in": ["$_id", "$$skillId"] }
                                }
                            }
                        ],
                        "as": "skills"
                    }
                },


                //         ],
                //         "as": "userskills"
                //     }
                //  },

                {
                    "$lookup": {
                        "from": "educations",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            },

                        ],
                        "as": "educations"
                    }
                },
                {
                    "$lookup": {
                        "from": "experiences",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            }
                        ],
                        "as": "experiences"
                    }
                },
                {
                    "$lookup": {
                        "from": "posts",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            }
                        ],
                        "as": "posts"
                    }
                },
                {
                    "$lookup": {
                        "from": "jobs",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            }
                        ],
                        "as": "jobs"
                    }
                },

            ])
            return res.status(200).json({
                success: true,
                message: Config.DATA_RETRIVED_SUCCESSFULLY,
                data: user

            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async getPost(req, res) {
        const filterName = req.query.posttitle
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.limit, 10) || 10;
        let skip = (page - 1) * pageSize

        try {
            const filter = filterName ? { posttitle: new RegExp(filterName, 'i') } : {};
            const post = await Post.find(filter)
                .skip(skip)
                .limit(pageSize)

            const totalPost = await Post.countDocuments(filter);
            return res.status(200).json({
                success: true,
                message: Config.POST_FIND,
                data: { totalPost, post }

            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    },
    async getJob(req, res) {
        const filterName = req.query.jobposition
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.limit, 10) || 10;
        let skip = (page - 1) * pageSize

        try {
            const filter = filterName ? { jobposition: new RegExp(filterName, 'i') } : {};
            const job = await Job.find(filter)
                .skip(skip)
                .limit(pageSize)

            const totalJob = await Job.countDocuments(filter);


            return res.status(200).json({
                success: true,
                message: Config.JOB_FIND,
                data: { totalJob, job }
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    // async dataGet(req, res) {
    //     const userId = req.params.id
    //     const filterName = req.query.fullname

    //     try {

    //         let matchStage = {

    //         };

    //         if (filterName) {

    //             matchStage.$match = {
    //                 ...matchStage.$match, fullname: { $regex: new RegExp(filterName, 'i') }
    //             };
    //         }
    //         const user = await User.aggregate([
    //             { $match: matchStage },
    //             {
    //                 "$lookup": {
    //                     "from": "posts",
    //                     "let": { "userId": "$post" },
    //                     "pipeline": [
    //                         {
    //                             "$match": {
    //                                 "$expr": { "$eq": ["$_id", "$$userId"] }
    //                             }
    //                         }
    //                     ],
    //                     "as": "posts"
    //                 }
    //             },
    //             {
    //                 "$lookup": {
    //                     "from": "jobs",
    //                     "let": { "userId": "$job" },
    //                     "pipeline": [
    //                         {
    //                             "$match": {
    //                                 "$expr": { "$eq": ["$_id", "$$userId"] }
    //                             }
    //                         }
    //                     ],
    //                     "as": "jobs"
    //                 }
    //             }
    //         ])
    //         return res.status(200).json({
    //             success: true,
    //             message: Config.GET_DATA,
    //             data: user
    //         })
    //     } catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: 'Internal server error'
    //         })
    //     }
    // }


}
module.exports = adminControler
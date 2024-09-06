
const { query, response } = require('express')
const User = require('../../models/user')
const Config = require('../../constant/constant')
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Userskill = require('../../models/userSkill')
const bcrypt = require('bcrypt')
const saltword = 10
const Skill = require('../../models/skill')
const Education = require('../../models/education')
const Experience = require('../../models/experience')
const Post = require('../../models/post')
const ObjectId = require('mongoose').Types.ObjectId;
const Job = require('../../models/job')





const userControler = {
    async signup(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltword);
            const userdata = new User({
                fullname: req.body.fullname,
                dateofbirth: req.body.dateofbirth,
                gender: req.body.gender,
                email: req.body.email,
                password: hashedPassword,
                dialcode: req.body.dialcode,
                countrycode: req.body.countrycode,
                phonenumber: req.body.phonenumber,
                location: req.body.location,
                image: req.body.image
            });


            if (req.file) {
                userdata.image = `static/files/` + req.file.filename
            }
            let array = []
            let fileDataArray = req.map(file => (
                array.push(`/static/files/` + req.file.filename)
            ))

            let result = await userdata.save();
            let token = jwt.sign(
                {
                    id: result._id
                }, "secretKey"

            );

            return res.status(200).json({
                success: true,
                message: Config.USER_CREATE_SUCCESSFULLY,
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
            let existuser = await User.findOne({ email: email }).select('+password')
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
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async AddUserskill(req, res) {
        try {
            const user = new Userskill({
                userId: req.user.id,
                skillId: req.body.skillId
            })
            let result = await user.save();
            return res.status(200).json({
                success: true,
                message: Config.USER_SKILL_CREATE,
                data: result
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server'
            })
        }
    },
    async getskill(req, res) {
        try {
            const skill = await Skill.find({ status: 0 });
            return res.status(200).json({
                success: true,
                message: Config.SKILLS_ADD,
                result: skill
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'err.message'
            })
        }
    },
    // async adduserskill(req, res) {
    //     const userId = req.body.id
    //     // console.log(userId, "id")
    //     const body = req.body
    //     // console.log(body, "sd")
    //     try {
    //         const user = await User.findByIdAndUpdate(userId, { skill: body.skill }, { new: true });
    //         // console.log(user, "usr")
    //         return res.status(200).json({
    //             success: true,
    //             message: Config.USER_UPDATE,
    //             data: user
    //         })

    //     }
    //     catch (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: 'err.message'
    //         })
    //     }
    // },
    async createeducation(req, res) {
        try {
            const user = new Education({
                userId: req.body.userId,
                levelofeducation: req.body.levelofeducation,
                institutionname: req.body.institutionname,
                fieldofstudy: req.body.fieldofstudy,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            })
            let result = await user.save();
            return res.status(200).json({
                success: true,
                message: Config.CREATE_EDUCATION_SYSTEM,
                data: result
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async geteducation(req, res) {
        try {
            const user = await Education.find();
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.NO_USER_FOUND,
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.FIND_EDUCATION,
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async updateeducation(req, res) {
        try {
            let id = req.params.id
            let update = {
                levelofeducation: req.body.levelofeducation,
                institutionname: req.body.institutionname,
                fieldofstudy: req.body.fieldofstudy,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            }
            const updateeducation = await Education.findByIdAndUpdate(id, update, { new: true });

            return res.status(200).json({
                success: true,
                message: Config.UPDATE_EDUCATION,
                data: updateeducation
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async deleteeducation(req, res) {
        try {
            let id = req.params.id

            let user = await Education.findByIdAndDelete(id);
            if (!user) {
                console.log(user)
                return res.status(404).json({
                    success: false,
                    message: Config.NOT_USER
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.DELETE_USER_SUCCESSFULLY,
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'

            })
        }
    },
    async createexperience(req, res) {
        try {
            const user = new Experience({
                userId: req.body.userId,
                jobtitle: req.body.jobtitle,
                company: req.body.company,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            })
            let result = await user.save();
            return res.status(200).json({
                success: true,
                message: Config.EXPERIENCE_CREATE,
                data: result,

            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getexperience(req, res) {
        try {
            const user = await Experience.find();
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.USER_NO
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.EXPERIENCE_FIND,
                data: user
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async updateexperience(req, res) {
        try {
            let id = req.params.id
            let update = {
                jobtitle: req.body.jobtitle,
                company: req.body.company,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description
            }
            const updateexperience = await Experience.findByIdAndUpdate(id, update, { new: true })

            return res.status(200).json({
                success: true,
                message: Config.UPDATE_EXPERIENCE,
                data: updateexperience
            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async deleteexperience(req, res) {
        try {
            let id = req.params.id
            let user = await Experience.findByIdAndDelete(id);
            if (!user) {
                // console.log(user)
                return res.status(404).json({
                    success: false,
                    message: Config.NOT_USER
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.USER_DELETE_SUCCESSFULLY
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    async getalldata(req, res) {
        try {
            //  const userId = req.user.id
            console.log(req.user.id)
            const user = await User.aggregate([
                { $match: { _id: new ObjectId(req.user.id) } },
                {
                    $lookup: {
                        from: 'skills',
                        localField: 'skill',
                        foreignField: '_id',
                        as: 'skills'
                    }
                },
                // {
                //     $lookup: {
                //         from: 'experiences',
                //         localField: '_id',
                //         foreignField: 'userId',
                //         as: 'experiences'
                //     }
                // },
                {
                    "$lookup": {
                        "from": "experiences",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                    // "shopPosId": { "$exists": false }
                                }
                            }
                        ],
                        "as": "experiences"
                    }
                },
                // {
                //     $lookup: {
                //         from: 'educations',
                //         localField: '_id',
                //         foreignField: 'userId',
                //         as: 'educations'
                //     }
                // },
                {
                    "$lookup": {
                        "from": "educations",
                        "let": { "userId": "$_id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": { "$eq": ["$userId", "$$userId"] },
                                }
                            }
                        ],
                        "as": "educations"
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
                }

            ]);
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
    async addpost(req, res) {

        try {
            const user = new Post({
                userId: req.body.userId,
                posttitle: req.body.posttitle,
                description: req.body.description,
                image: req.body.image

            });
            if (req.file) {
                user.image = `static/files/` + req.file.filename
            }
            let array = []
            let fileDataArray = req.map(file => (
                array.push(`/static/files/` + req.file.filename)
            ));
            let result = await user.save();
            return res.status(200).json({
                success: true,
                message: Config.ADD_POST,
                data: result
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getpost(req, res) {
        try {
            const user = await Post.find();
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.USER_NOT_GET
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.POST_FIND,
                data: user
            })

        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async updatepost(req, res) {
        try {
            let id = req.params.id

            let update = {
                posttitle: req.body.posttitle,
                description: req.body.description,
                // image:req.body.image
            }
            if (req.file) {
                update.image = `static/files/` + req.file.filename
            }
            const updatepost = await Post.findByIdAndUpdate(id, update, { new: true })

            return res.status(200).json({
                success: true,
                message: Config.ADDPOST_UPDATE,
                data: updatepost

            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })

        }
    },
    async deletepost(req, res) {
        try {
            let id = req.params.id;
            let user = await Post.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'no user'
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.DELETE_POST

            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    },
    async addjob(req, res) {
        try {
            const user = new Job({
                userId: req.body.userId,
                jobposition: req.body.jobposition,
                typeofworkplace: req.body.typeofworkplace,
                joblocation: req.body.joblocation,
                company: req.body.company,
                employmenttype: req.body.employmenttype,
                description: req.body.description

            })
            let result = await user.save();
            return res.status(200).json({
                success: true,
                message: Config.ADD_JOB_FIELD_SUCCESSFULLY,
                data: result
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async getjob(req, res) {
        try {
            const user = await Job.find();
            if (!user) {
                console.log(user)
                return res.status(404).json({
                    success: false,
                    message: Config.USER_NOT_EXISTS
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.ADD_JOBS,
                data: user
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'err.message'
            })
        }
    },
    async updatejob(req, res) {
        try {
            let id = req.params.id;

            let update = {
                jobposition: req.body.jobposition,
                typeofworkplace: req.body.typeofworkplace,
                joblocation: req.body.joblocation,
                company: req.body.company,
                employmenttype: req.body.employmenttype,
                description: req.body.description
            }
            const updatejob = await Job.findByIdAndUpdate(id, update, { new: true })

            return res.status(200).json({
                success: true,
                message: Config.UPDATE_JOB,
                data: updatejob
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async deletejob(req, res) {
        try {
            let id = req.params.id;
            let user = await Job.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.NO_USER
                })
            }
            return res.status(200).json({
                success: true,
                message: Config.DELETE_JOB

            })
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
    async updateResume(req, res) {
        try {
            let id = req.params.id
            const user = await User.find({ id });
            // console.log(user, "user")
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: Config.FOUND_NO_USER
                });
            };
            let update = {}
            if (req.file) {
                update.resume = `static/files/` + req.file.filename
            }
            const result = await User.findByIdAndUpdate(id, update, { new: true });
            // let array = []
            // let fileDataArray = req.map(file => (
            //     array.push(`/static/files/` + req.file.filename)
            // ));
            return res.status(200).json({
                success: true,
                data: result
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },
}

module.exports = userControler


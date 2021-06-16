const express = require('express')
const nodemailer = require('nodemailer')
const app = express();
const mongoose = require('./database/mongoose');
const User = require('./database/models/User');
const Resource = require('./database/models/Resource');
const Comment = require('./database/models/Comment');
const Report = require('./database/models/Report');
const Ratting = require('./database/models/Ratting');
const SearchString = require('./database/models/SearchString');
const { connection } = require('mongoose');
const { request } = require('express');
app.use(express.json());
//To allow cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

async function sendMail(mail_id, message, subject) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "bidmafia007@gmail.com", // generated ethereal user
            pass: "msodqaowigryvpvb", // generated ethereal password
        },
    });

    let mailoption = {
        from: "Electrify",
        to: mail_id,
        subject: subject,
        text: message,
        html: `<h1>` + message + `</h1>`
    }

    let info = await transporter.sendMail(mailoption);
}



/*----------------------------------- User Actions -----------------------------------------------*/
//To get user with gven id
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});

//To get user by email
app.get('/user_by_email/:email', (req, res) => {
    User.findOne({ email: req.params.email })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid email' + req.body.email)
            } else {
                res.send(user)
            }
        })
        .catch((error) => console.log(error))
});

//To Block user
app.patch('/blockUser/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((user) => {
            sendMail(user.email,"<h1>BestResource.com</h1><p>Your Account is Blocked Due to posting abusive resources</p>","Account Blocked")
            res.send(user)
        })
        .catch((error) => console.log(error));
});

//To Unblock user
app.patch('/unblockUser/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((user) => {
            sendMail(user.email,"<h1>BestResource.com</h1><p>Your Account is unblocked, now you can continue using owr website</p>","Account Unblocked")
            res.send(user)
        })
        .catch((error) => console.log(error));
});


//To send OTP
app.post('/sendOTP', (req, res) => {
    console.log(req.body.email)
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid email' + req.body.email)
            } else {
                time = (new Date().getTime()) % 10000
                otp = (time) % 10000
                otp = "" + otp
                let message = otp + " is your one time password to change your password"
                sendMail(req.body.email, message, "OTP to update password"),
                res.send(otp)
            }
        })
        .catch((error) => console.log(error));
});


//To get all users
app.get('/users', (req, res) => {
    User.find()
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});

//To create new user
app.post('/users', (req, res) => {
    (new User(req.body))
        .save()
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});

//To verify login credentials
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(401).send('Invalid email')
            } else {
                if (user.password !== req.body.password) {
                    res.status(401).send('Invalid password')
                }
                else if (user.status == "blocked") {
                    res.status(401).send('Your account has been blocked')
                } else {
                    res.status(200).send(user)
                }
            }
        })
        .catch((error) => console.log(error));
});

//To update user details
app.patch('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});

//To get blocked users
app.get('/blocked_users', (req, res) => {
    User.find({status: 'blocked' })
        .then((users) => {
            res.send(users)
        })
        .catch((error) => console.log(error));
});


/*----------------------------------- SearchString Actions -----------------------------------------------*/
app.get('/search', (req, res) => {
    SearchString.find()
        .then((SearchString) => res.send(SearchString))
        .catch((error) => console.log(error));
});


/*----------------------------------- Resource Actions -----------------------------------------------*/
//To get Resource with gven id
app.get('/resource/:id', (req, res) => {
    Resource.findById(req.params.id)
        .then((Resource) => res.send(Resource))
        .catch((error) => console.log(error));
});

//To get all Resources
app.get('/resource', (req, res) => {
    Resource.find()
        .then((Resource) => res.send(Resource))
        .catch((error) => console.log(error));
});

//To delete Resource by id
app.get('/delete_resource/:id', (req, res) => {
    console.log("Delete Request")
    Resource.findByIdAndDelete(req.params.id)
        .then((resource) => {
            SearchString.findOne({ 'searchString': resource.topic })
                .then((searchString) => {
                    if (searchString.total == 1) {
                        console.log("total = 1")
                        SearchString.findByIdAndDelete(searchString._id, function (err, docs) {
                            if (err){
                                console.log(err)
                            }
                            else{
                                console.log("Deleted : ", docs);
                            }
                        });
                    }
                    else {
                        searchString.total = searchString.total - 1
                        SearchString.findByIdAndUpdate(searchString._id, { $set: searchString })
                            .then((searchString) => {
                                console.log("Deleted "+searchString)
                            })
                    }
                    Report.deleteMany({ resource_id: req.params.id })
                        .then(() => {
                            res.status(200)
                            res.send()
                        })
                })
        })
})

//To get active Resources with topic
app.get('/active_resource_by_topic/:searchString', (req, res) => {
    Resource.find({ topic: req.params.searchString, status: 'active' })
        .then((Resources) => res.send(Resources))
        .catch((error) => console.log(error));
});

//To get blocked resources
app.get('/blocked_resource', (req, res) => {
    Resource.find({status: 'blocked' })
        .then((Resources) => {
            res.send(Resources)
        })
        .catch((error) => console.log(error));
});

//To get Resources by user_id
app.get('/resource_by_user/:id', (req, res) => {
    Resource.find({ user_id: req.params.id })
        .then((Resources) => res.send(Resources))
        .catch((error) => console.log(error));
});


//To create new Resource
app.post('/resource', (req, res) => {
    (new Resource(req.body))
        .save()
        .then((Resource) => {
            SearchString.findOne({ 'searchString': req.body.topic })
                .then((searchString) => {
                    if (searchString == null) {
                        searchString = new SearchString()
                        searchString.searchString = req.body.topic
                        searchString.total = 1
                        searchString.save()
                            .then((ss) => {
                                console.log(ss)
                            })
                            .catch((error) => console.log(error))
                    }
                    else {
                        console.log(searchString)
                        searchString.total = searchString.total + 1
                        console.log(searchString)
                        SearchString.findByIdAndUpdate(searchString._id, { $set: searchString })
                            .then((searchstring) => {
                                console.log(searchstring)
                            })
                            .catch((error) => console.log(error))
                    }

                })
                .catch((error) => console.log(error))
            /*if(searchString.total == undefined){
                searchString = new SearchString()
                searchString.searchString = Resource.topic
                searchString.total = 1
                searchString.save()
                    .then((searchString) => console.log("new added "+searchString.searchString+" "+searchString.total))
                    .catch((error) => console.log(error));
            }
            else{
                searchString.total = searchString.total + 1
                searchString.findByIdAndUpdate(searchString._id)
                .then((searchString) => console.log("updated "+searchString.searchString+" "+searchString.total))
                .catch((error) => console.log(error));
            }*/
            res.send(Resource)
        })
        .catch((error) => console.log(error));
});

//To update Resource details
app.patch('/resource/:id', (req, res) => {
    Resource.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((Resource) => res.send(Resource))
        .catch((error) => console.log(error));
});

app.patch('/blockResource/:id', (req, res) => {
    Resource.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((resource) => {
            SearchString.findOne({ 'searchString': resource.topic })
                .then((searchString) => {
                    if (searchString.total == 1) {
                        console.log("total = 1")
                        SearchString.findByIdAndDelete(searchString._id, function (err, docs) {
                            if (err){
                                console.log(err)
                            }
                            else{
                                console.log("Deleted : ", docs);
                            }
                        });
                    }
                    else {
                        searchString.total = searchString.total - 1
                        SearchString.findByIdAndUpdate(searchString._id, { $set: searchString })
                            .then((searchString) => {
                                console.log(searchString)
                            })
                    }
                    Report.deleteMany({ resource_id: req.params.id })
                        .then(() => {
                            res.status(200)
                            res.send()
                        })
                })
        })
})

app.patch('/unblockResource/:id', (req, res) => {
    Resource.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then((resource) => {
            SearchString.findOne({ 'searchString': resource.topic })
                .then((searchString) => {
                    if (searchString == null) {
                        searchString = new SearchString()
                        searchString.searchString = resource.topic
                        searchString.total = 1
                        searchString.save()
                            .then((searchString) => {
                                console.log(searchString)
                            })
                            .catch((err) => console.log(err))
                    }
                    else {
                        searchString.total = searchString.total + 1
                        SearchString.findByIdAndUpdate(searchString._id, { $set: searchString })
                            .then((searchString) => {
                                console.log(searchString)
                            })
                    }
                })
        })
})


/*----------------------------------- Comment Actions -----------------------------------------------*/

//to add new comment
app.post('/comments', (req, res) => {
    console.log(req.body.comment);
    (new Comment(req.body))
        .save()
        .then((comment) => res.send(comment))
        .catch((error) => console.log(error));
});

//To get all comments
app.get('/comments', (req, res) => {
    Comment.find()
        .then((comment) => res.send(comment))
        .catch((error) => console.log(error));
});

//To delete Comment By id
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then((comment) => {
            res.send(comment)
        })
        .catch((error) => console.log(error))
})

//To get all comments for a given resource
app.get('/comments_by_resource/:resource_id', (req, res) => {
    Comment.find({ resource_id: req.params.resource_id })
        .then((comments) => res.send(comments))
        .catch((error) => console.log(error));
})

/*----------------------------------- Report Actions -----------------------------------------------*/

//to add new report
app.post('/reports', (req, res) => {
    (new Report(req.body))
        .save()
        .then((report) => {
            res.send(report)
            console.log("new report added")
        })
        .catch((error) => console.log(error));
});

//To get all reports
app.get('/reports', (req, res) => {
    Report.find()
        .then((reports) => res.send(reports))
        .catch((error) => console.log(error));
});

//To get all report by id
app.get('/reports/:id', (req, res) => {
    Report.findById(req.params.id)
        .then((reports) => res.send(reports))
        .catch((error) => console.log(error));
});

//To delete Reports By resource_id
app.delete('/reports_by_resource/:resource_id', (req, res) => {
    Report.deleteMany({ resource_id: req.params.resource_id })
        .then(() => {
            console.log("reports deleted")
            res.status(200)
            res.send()
        })
        .catch((error) => console.log(error))
})

// //To get all comments for a given resource
// app.get('/comments_by_resource/:resource_id',(req, res) => {
//     Comment.find({resource_id : req.params.resource_id})
//         .then((comments) => res.send(comments))
//         .catch((error) => console.log(error));
// })

/*----------------------------------- Rattings Actions -----------------------------------------------*/
//to add new rattings
app.post('/rate', (req, res) => {
    (new Ratting(req.body))
        .save()
        .then((ratting) => {
            res.send(ratting)
        })
        .catch((error) => console.log(error));
});

app.get('/rattingsByResource/:id', (req, res) => {
    Ratting.find({resource_id : req.params.id})
        .then((rattings) => {
            res.send(rattings)
        })
        .catch((err) => console.log(err))
})

app.get('/rattingsByUser/:id/:r_id', (req, res) => {
    Ratting.find({user_id : req.params.id, resource_id : req.params.r_id})
        .then((rattings) => {
            res.send(rattings)
        })
        .catch((err) => console.log(err))
})


app.listen(3000, () => console.log("Backend : Server connected on port 3000"));
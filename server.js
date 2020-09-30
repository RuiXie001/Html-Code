const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validator = require("validator");
const alert = require("alert");
const bcrypt = require("bcrypt");
const https = require("https");
const nodemailer = require("nodemailer");
const fs = require("fs");
const usersRouter = require("./users");
var Session = require('express-session');
var google = require('googleapis');


const NEWNOTE = new mongoose.Schema({
  ///////
  country: {
    type: String,
    required: true,
    validator(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please choose your country!");
      }
    },
  },
  firstname: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input your first name!");
      }
    },
  },
  lastname: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input your last name!");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validator(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input your email address!");
      }
      if (!validator.isEmail(value)) {
        throw new Error("Your email address is not valid!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input your password!");
      }
      if (
        !validator.isLength(value, {
          min: 8,
        })
      ) {
        throw new Error("Your password must be at least 8 characters!");
      }
    },
  },
  Con_password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.equals(value, this.password)) {
        throw new Error(
          "Your password should be the same as Confirm password!"
        );
      }
    },
  },
  address: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input address!");
      }
    },
  },
  city: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input city!");
      }
    },
  },
  reigon: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please input state!");
      }
    },
  },
  code: {
    type: Number,
    required: false,
    minlength: 4,
  },
  phoneNumber: {
    type: String,
    required: false,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Your phone number is not valid!");
      }
      if (
        !validator.isLength(value, {
          min: 11,
        })
      ) {
        throw new Error("Your Phone Number must be at least 11 characters!");
      }
    },
  },
  updated_at: Date,
});

const Note = mongoose.model("Note", NEWNOTE);

//
mongoose.connect("mongodb://localhost:27017/task", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected!");
});

////////////////////////////////
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/users", usersRouter);

app.use(Session({
  secret: 'sBT7S0bPL2PayiOgJXjd_IqJ',
  resave: true,
  saveUninitialized: true
}));


app.get("/", (req, res) => {
  res.redirect("/index.html");
});
//////////////////////////////
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/signup", (req, res) => {
  const country = req.body.country;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const Con_password = req.body.password_confirm;
  const address = req.body.address;
  const city = req.body.city;
  const reigon = req.body.reigon;
  const code = req.body.code;
  const phoneNumber = req.body.phoneNumber;

  const newNote = new Note({
    country: country,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    Con_password: Con_password,
    address: address,
    city: city,
    reigon: reigon,
    code: code,
    phoneNumber: phoneNumber,
    updated_at: Date.now(),
  });
  newNote.save(function (error) {
    if (error) {
      if (validator.isEmpty(firstname)) {
        alert("Please input your first name.");
      } else if (validator.isEmpty(lastname)) {
        alert("Please input your last name.");
      } else if (validator.isEmpty(email)) {
        alert("Please input your email address.");
      } else if (!validator.isEmail(email)) {
        alert("Your e-mail address is not valid!");
      } else if (validator.isEmpty(password)) {
        alert("Please input your password.");
      } else if (
        !validator.isLength(password, {
          min: 8,
        })
      ) {
        alert("Your password must be at least 8 characters!");
      } else if (!validator.equals(Con_password, password)) {
        alert("Your password should be the same as Confirm password!");
      } else if (validator.isEmpty(address)) {
        alert("Please input your address.");
      } else if (validator.isEmpty(city)) {
        alert("Please input your city.");
      } else if (validator.isEmpty(reigon)) {
        alert("Please input your state.");
      } else if (
        !validator.isMobilePhone(phoneNumber, [
          "am-Am",
          "ar-AE",
          "ar-BH",
          "ar-DZ",
          "ar-EG",
          "ar-IQ",
          "ar-JO",
          "ar-KW",
          "ar-SA",
          "ar-SY",
          "ar-TN",
          "be-BY",
          "bg-BG",
          "bn-BD",
          "cs-CZ",
          "da-DK",
          "de-DE",
          "de-AT",
          "de-CH",
          "el-GR",
          "en-AU",
          "en-CA",
          "en-GB",
          "en-GG",
          "en-GH",
          "en-HK",
          "en-MO",
          "en-IE",
          "en-IN",
          "en-KE",
          "en-MT",
          "en-MU",
          "en-NG",
          "en-NZ",
          "en-PK",
          "en-RW",
          "en-SG",
          "en-SL",
          "en-UG",
          "en-US",
          "en-TZ",
          "en-ZA",
          "en-ZM",
          "en-ZW",
          "es-CL",
          "es-CO",
          "es-CR",
          "es-EC",
          "es-ES",
          "es-MX",
          "es-PA",
          "es-PY",
          "es-UY",
          "et-EE",
          "fa-IR",
          "fi-FI",
          "fj-FJ",
          "fo-FO",
          "fr-BE",
          "fr-FR",
          "fr-GF",
          "fr-GP",
          "fr-MQ",
          "fr-RE",
          "he-IL",
          "hu-HU",
          "id-ID",
          "it-IT",
          "ja-JP",
          "kk-KZ",
          "kl-GL",
          "ko-KR",
          "lt-LT",
          "ms-MY",
          "nb-NO",
          "ne-NP",
          "nl-BE",
          "nl-NL",
          "nn-NO",
          "pl-PL",
          "pt-BR",
          "pt-PT",
          "ro-RO",
          "ru-RU",
          "sl-SI",
          "sk-SK",
          "sr-RS",
          "sv-SE",
          "th-TH",
          "tr-TR",
          "uk-UA",
          "vi-VN",
          "zh-CN",
          "zh-HK",
          "zh-MO",
          "zh-TW",
        ])
      ) {
        alert("Your phone number is not valid!");
      } else {
        console.log(Error);
        alert("Error...");
      }
    } else {
      console.log(newNote);
      console.log("Success!!!");
      res.redirect("/success_signup");
    }
  });

  //
  //res.send("I am posting now, the content is: "+NUM1+"And "+NUM2);
  //res.sendFile(__dirname + "/public/index copy.html")
});
////////////////////////////////
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  Note.findOne(
    {
      email: email,
    },
    function (error, ress) {
      if (ress == null) {
        alert("Incorrect E-mail address!");
      } else {
        const result = bcrypt.compareSync(password, ress.password);
        if (result == null) {
          alert("Incorrect password!");
        } else {
          console.log("Log in Successfully!");
          res.redirect("/success_login");
        }
      }
    }
  );
});
////////////////////
app.get("/success_login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/success_login.html"));
});

app.get("/success_signup", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/success_signup.html"));
});
////////////////////////
app.get("/forgotP", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/forgotP.html"));
});

app.post("/forgotP", (req, res) => {
  const email = req.body.email;
  console.log("Success send reset mail!!!");
  res.redirect("/success_send");
  const transporter = nodemailer.createTransport({
    service: "qq",
    port: 465, // SMTP 端口
    secureConnection: true,
    host: "smtp",
    auth: {
      user: "1196879229@qq.com",
      pass: "xkgyxurwxmxtbach", //授权码,通过QQ获取
    },
  });
  const mailOptions = {
    from: "1196879229@qq.com", // 发送者
    to: email, // 接受者,可以同时发送多个,以逗号隔开
    subject: "reset password email", // 标题
    text: "Reset password link: http://127.0.0.1:3000/changeP",
    html: "<b>Reset password link: http://127.0.0.1:3000/changeP</b>",
  };

  const result = {
    httpCode: 200,
    message: "send success!",
  };
  try {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        result.httpCode = 500;
        result.message = err;
        callback(result);
        return;
      }
      callback(result);
    });
  } catch (err) {
    result.httpCode = 500;
    result.message = err;
    callback(result);
  }
});
/////////////////////
app.get("/changeP", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/changeP.html"));
});

app.post("/changeP", (req, res) => {
  const Emails = req.body.email;

  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017";

  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      console.log("e 1");
      var dbo = db.db("task");
      console.log("e 2");
      dbo
        .collection("notes")
        .find({ "email": req.body.email })
        .toArray(function (err0,result) {
          if (err0) throw err0;
          console.log("e 3!");
          if (result[0]["email"] == req.body.email) {

            console.log("e 4");
            dbo.collection("notes").updateOne(
              { "email": req.body.email },
              {
                $set: {
                  "password": req.body.newpassword,
                  "Con_password": req.body.newpassword,
                },
              },
              function (err, res2) {
                if (err) throw err;
                console.log("update success");
                res.redirect("/success_change");
              }
            );

            
          }
          else{
            console.log("Didn't find the email..."+result[0]["email"]+"!");
          }
        });
    }
  );

  // db.collection("users").find(Emails).toArray(function (err, result) {
  //     if (err) throw err;
  //     if (result[0]["password"] == req.body.oldpassword) {
  //       var Emails = { firstname: req.body.email }; // 查询条件
  //       var updateStr = {
  //         $set: {
  //           password: req.body.newpassword,
  //           Con_password: req.body.newpassword,
  //         },
  //       };

  //       db.collection("users").updateOne(Emails, updateStr, function (err, res2) {
  //         if (err) throw err;
  //         console.log("update success");
  //         res.redirect("/success_change");
  //       });

  //     }
  //   });

  // Note.task.update({email:Emails},{$set:{password:req.body.newpassword}})
  // console.log("update success");
  // res.redirect("/success_change");
});
///////////////////
app.get("/success_send", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/success_send.html"));
});

app.get("/success_change", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/success_change.html"));
});

app.get("/success_google", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/success_google.html"));
});











let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
//app.listen(Process.env.PORT||3000)
app.listen(port, function (request, response) {
  console.log("Runnning on port 3000");
});

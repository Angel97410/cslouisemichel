var express = require('express');
var router = express.Router();
const { log } = require('debug');
const { Router } = require('express');
const nodemailer = require("nodemailer");
var mongoose = require('mongoose');
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://Angelique:Ti.lilik974@cluster0.ajf4v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  options,
  function (err) {
    if (err) {
      console.log(err)
      console.log("---------> Problème de connexion à la base de données MongoDB");
    } else {
      console.log("---------> Connecté à la base de données MongoDB")
}
  }
);
var UserDB = require('../models/users')

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'robert.angelique@outlook.com', // EMAIL
    pass: 'Ti.lilik974' // MDP
  },
});

newsletter = []
Newmail= [{}]
newmessage=[{}]
var actu = [{
    photo: "./images/periscolaire/mercredis.jpg",
    titre: "Activités des 6-7 ans",
    para: "Un petit totem créer par les 6-7ans"
  },
  {
    photo: "./images/periscolaire/mercredis.jpg",
    titre: "Activités des 6-7 ans",
    para: "Un petit totem créer par les 6-7ans"
  },
  {
    photo: "./images/periscolaire/mercredis.jpg",
    titre: "Activités des 6-7 ans",
    para: "Un petit totem créer par les 6-7ans"
  },
  {
    photo: "./images/periscolaire/mercredis.jpg",
    titre: "Activités des 6-7 ans",
    para: "Un petit totem créer par les 6-7ans"
  },
  {
    photo: "./images/periscolaire/mercredis.jpg",
    titre: "Activités des 6-7 ans",
    para: "Un petit totem créer par les 6-7ans"
  }
]
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {actu});
});

// Formulaire newsletter

router.post('/mail', async function(req, res, next) {
  var email =req.body.email;
  newsletter.push(email);
  console.log(newsletter);

  var exist = await UserDB.findOne({
    Email: req.body.email,
  })
  if (!exist) {
    var NewUser = new UserDB({
      Email: req.body.email,
    })
    await NewUser.save()
    res.render('index', {actu}, {newsletter});
  } else {
    alert('votre adresse mail existe déjà')
    res.redirect('/')
  }
});

router.get('/', function (req, res, next) {
  res.render('index', {actu});
});

// Page programme Perisco
router.get('/periscolaire', function(req, res, next) {
  res.render('periscolaire');
});

// Page programme activ culturelles
router.get('/activitesCulturel', function(req, res, next) {
  res.render('activitesCulturel');
});
// Page programme Petite Enfance
router.get('/HalteGarderie', function(req, res, next) {
  res.render('HalteGarderie');
});

// Page programme Enfant
router.get('/prog-enfant', function(req, res, next) {
  res.render('prog-enfant');
});

// Page programme Adolescent
router.get('/prog-adolescents', function(req, res, next) {
  res.render('prog-adolescents');
});

// Page programme Adultes
router.get('/adultes', function(req, res, next) {
  res.render('adultes');
});


// Page programme Familles
router.get('/Familles', function(req, res, next) {
  res.render('Familles');
});


// Nos tarifs
router.get('/tarifs', function(req, res, next) {
  res.render('Tarifs');
});

// Page qui sommes nous
router.get('/Qui', function(req, res, next) {
  res.render('Qui');
});

// Nous contacter
router.post('/message', async function(req, res, next) {
  mail = req.body.mail;
  Newmail.push(mail);
  message = req.body.message;
  newmessage.push(message);
  console.log(mail, Newmail)

  let info = await transporter.sendMail({
    from: '<mail>', // sender address
    to: "robert.angelique@outlook.com", // list of receivers
    subject: "Contact", // Subject line
    text: message, // plain text body
    html: message + " " + mail, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log(mail)
  res.redirect('Nous-contacter')
});

router.get('/Nous-contacter', function(req, res, next) {
  res.render('Nous-contacter');
});

// Mentions légales
router.get('/Mentions-legales', function(req, res, next) {
  res.render('Mentions-legales');
});


module.exports = router;
var express = require('express');
var router = express.Router();
let alert = require('alert'); 
const {
  log
} = require('debug');
const {
  Router
} = require('express');
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
Newmail = [{}]
newmessage = [{}]
var actu = [
  {
    photo: "./images/Actu/projet-social.png",
    date: "04/06/2021",
    titre: "Projet du centre social",
    para: " ",
    autres: " "
  },
  {
    photo: "./images/Actu/prog.png",
    date: "28/05/2021",
    titre: "Programme de reprise des activités",
    para: " ",
    autres: " "
  },
  {
    photo: "./images/Actu/post-reprise.png",
    date: "21/05/2021",
    titre: "Reprise des activités - sport en salle avec les animateurs du Centre Social",
    para: " ",
    autres: " "
  },
]
/* ACCUEIL*/
router.get('/', function (req, res, next) {
  res.render('index', {
    actu
  });
});

// Formulaire newsletter

router.post('/mail', async function (req, res, next) {
  var email = req.body.email;
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
    alert("Vous êtes maintenant inscrit à notre newsletter")
    // res.render('index', {actu}, {newsletter},);
    res.redirect('/') 
  } else {
      alert("Votre adresse mail existe déjà")
      res.redirect('/')
  }
});

router.get('/', function (req, res, next) {
  res.render('index', {
    actu
  });
});

// Page programme Perisco
router.get('/periscolaire', function (req, res, next) {
  res.render('periscolaire');
});

// Page programme Petite Enfance
router.get('/HalteGarderie', function (req, res, next) {
  res.render('HalteGarderie');
});

// Page programme Enfant
router.get('/prog-enfant', function (req, res, next) {
  res.render('prog-enfant');
});

// Page programme Adolescent
router.get('/prog-adolescents', function (req, res, next) {
  res.render('prog-adolescents');
});

// Page programme Adultes
router.get('/adultes', function (req, res, next) {
  res.render('adultes');
});


// Page programme Familles
router.get('/Familles', function (req, res, next) {
  res.render('Familles');
});


// Nos tarifs
router.get('/tarifs', function (req, res, next) {
  res.render('tarifs');
});

// Page qui sommes nous
router.get('/Qui', function (req, res, next) {
  res.render('Qui');
});

// Nous contacter
router.post('/message', async function (req, res, next) {
  mail = req.body.mail;
  Newmail.push(mail);
  message = req.body.message;
  newmessage.push(message);
  // console.log(mail, Newmail)

  let info = await transporter.sendMail({
    from: '<robert.angelique@outlook.com>', // sender address
    to: "robert.angelique@outlook.com", // list of receivers
    subject: "Contact", // Subject line
    text: message, // plain text body
    html: "Adresse mail :" + mail + "  " + "Message : " + message, // html body
  });


  // console.log("Message sent: %s", info.messageId);
  // console.log(mail)
  res.redirect('/')
  alert("Message envoyé")
});

router.get('/Nous-contacter', function (req, res, next) {
  res.render('Nous-contacter');
});

// Mentions légales
router.get('/Mentions-legales', function (req, res, next) {
  res.render('Mentions-legales');
});

// Nos partenaires
router.get('/partenaires', function (req, res, next) {
  res.render('partenaires');
});

// Nos actualite
router.get('/actualite', function (req, res, next) {
  res.render('actualite');
});


module.exports = router;
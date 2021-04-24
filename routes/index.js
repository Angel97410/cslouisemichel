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
    photo: "./images/Actu/reprise.jpg",
    date: "23/04/2021",
    titre: "Réouverture",
    para: "Réouverture de la Halte-garderie, et reprise du périscolaire pour les maternelles et primaires.",
    autres: "À partir du lundi 26/04/2021"
  },
  {
    photo: "./images/Actu/ACM.jpg",
    date: "12/04/2021",
    titre: "L’ ACCUEIL COLLECTIF DE MINEURS",
    para: "Le Centre Social est exceptionnellement ouvert cette semaine pour les enfants des personnels prioritaires dans la gestion de la crise : soignants, travailleurs sociaux, etc... Les familles concernées qui n’ auraient pas d’ autres solutions peuvent nous contacter pour inscrire leur enfant.",
    autres: " Tel: 03.29.34.60.85 "
  },
  {
    photo: "./images/Actu/AccPF.jpg",
    date: "12/04/2021",
    titre: "LIEU D’ACCUEIL PARENT-ENFANT",
    para: "Exceptionnellement, malgré les mesures de confinement et en application des directives nationales, le lieu d’Accueil Parents Enfants sera ouvert le mercredi 14 avril et le mercredi 21 avril de 14h00 à 17h00. Si vous avez besoin d’échanger sur vos difficultés, de partager un moment avec vos enfants, vous serez les bienvenus. Nous limiterons l’accueil à 5 personnes adultes.",
    autres: ""
  },
]
/* GET home page. */
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
    res.render('index', {actu}, {newsletter},); 
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

// Page programme activ culturelles
router.get('/activitesCulturel', function (req, res, next) {
  res.render('activitesCulturel');
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
  console.log(mail, Newmail)

  let info = await transporter.sendMail({
    from: '<robert.angelique@outlook.com>', // sender address
    to: "robert.angelique@outlook.com", // list of receivers
    subject: "Contact", // Subject line
    text: message, // plain text body
    html: "Adresse mail :" + mail + "  " + "Message :" + message, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log(mail)
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


module.exports = router;
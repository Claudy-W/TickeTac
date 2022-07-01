
var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

//route Sign-in
router.post('/sign-in', async function(req, res, next) {
  var errorMsg = "Vous n'êtes pas encore voyageur. Inscrivez-vous !"
  var user = await userModel.findOne( { email : req.body.email } )
  if (user !== null) {
    if (user.password == req.body.password && user.email == req.body.email) {
      res.redirect('/homepage') ;
      req.session.newUserId = user._id
      req.session.email = user.email
      console.log('session', req.session)
    } else{
      res.render('index', { title : 'TickeTac', errorMsg }) }
  } else {
  res.redirect('/')}
})
 ;

//route Sign-up
router.post('/sign-up', async function(req, res, next) {
  console.log('body', req.body)
  var newUser = new userModel({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
 });
 
 req.session.email = req.body.email
 
 var userSaved = await newUser.save();
 
 //récupérer l'id du nouveau user pour le save en session
var newUserId = userSaved._id
req.session.newUserId = newUserId
 
console.log('newUserId', newUserId)
 
  res.render('homepage');
});
 
module.exports = router;

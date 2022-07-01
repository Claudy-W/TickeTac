
var express = require('express');
var router = express.Router();
var userModel = require('../models/users')
 
 
//route sign-up
router.post('/sign-up', async function(req, res, next) {
  var newUser = new userModel({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    password: req.body.password,
 });
 
 req.session.username = req.body.username
 
 var userSaved = await newUser.save();
 
 //récupérer l'id du nouveau user pour le save en session
var newUserId = userSaved._id
req.session.newUserId = newUserId
 
console.log('newUserId', newUserId)
 
  res.redirect('/weather');
});
 
//route Sign-in
router.post('/sign-in', async function(req, res, next) {
  var errorMsg = "Vous n'êtes pas sur la liste, ça va pas être possible."
  var user = await userModel.findOne( { email : req.body.email } )
  if (user !== null) {
    if (user.password == req.body.password && user.email == req.body.email) {
      res.redirect('/weather') ;
      req.session.newUserId = user._id
      req.session.username = user.username
      console.log(req.session)
    } else{
      res.render('login', { title : 'WeatherApp', errorMsg }) }
  } else {
  res.redirect('/')}
})
 ;
 
 //route pour la déconnexion
 router.get('/logout', function(req, res, next) {
  var errorMsg = ''
  req.session =''
  res.redirect('/');
});
 
module.exports = router;

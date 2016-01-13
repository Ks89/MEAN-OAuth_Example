var express = require('express');
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  //get these values from https://developers.facebook.com/
  //creating a new application with siteURL= http://localhost:3000/
  //and "Valid OAuth redirect URIs": http://localhost:3000/api/auth/facebook/callback
  clientID: '- insert here you client id -',
  clientSecret: '- insert here you secret client secret -',
  callbackURL: "http://localhost:3000/api/auth/facebook/callback",
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  console.log("Facebook callback called");

  process.nextTick(function () {
    console.log(profile);
    //in the real impl, I'll do a call like User.findOne({...
      var user = {
        username: 'pippo',
        password: 'pluto'
      };
      done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', 
	passport.authenticate('facebook', { scope: ['email'] })
  );

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/profile');
  });

module.exports = app;
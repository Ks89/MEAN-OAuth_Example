var express = require('express');
var app = express();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  //get these values from https://developers.facebook.com/
  //creating a new application with siteURL= http://localhost:3000/
  //and "Valid OAuth redirect URIs": http://localhost:3000/api/auth/facebook/callback
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
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


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback",
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  console.log("GitHub authentication called");
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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
},
function(accessToken, refreshToken, profile, done) {
  console.log("Google callback called");
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

// third party anthentication
app.get('/auth/github', 
  passport.authenticate('github', { scope: [ 'user:email' ] })
  );
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/profile');
  });

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['email', 'https://www.googleapis.com/auth/plus.login'] })
  );

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication
    res.redirect('/profile');
  });

module.exports = app;
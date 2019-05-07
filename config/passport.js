const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys_dev');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
    }));


    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'name', 'picture.width(500)', 'emails', 'displayName'],
        }, (accessToken, refreshToken, profile, done) => {

        User.findOne({provider: 'facebook', providerID: profile.id})
                .then(user => {

                    if (user) {
                        user.name = profile.displayName;
                        user.email = profile.emails[0].value;
                        user.avatar = profile.photos[0].value;
                        user.save()
                            .then(user => {
                                return done(null, user);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        return done(null, false);
                    }
                })
        }
    ));



    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: "/api/users/login/github/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile, 'github');
        }
    ));



    passport.use(new GoogleStrategy({
            clientID: process.env.GOGGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/api/users/login/google/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile, 'google');
        }
    ));


    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "/api/users/login/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
    }, function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // To keep the example simple, the user's LinkedIn profile is returned to
            // represent the logged-in user. In a typical application, you would want
            // to associate the LinkedIn account with a user record in your database,
            // and return that user instead.
            console.log(profile, 'linkedin');
            return done(null, profile);
        });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });


};


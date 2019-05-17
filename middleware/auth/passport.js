const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../../models/Users');

module.exports = passport => {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'name', 'picture.width(500)', 'emails', 'displayName'],
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const res = await User.findOne({provider: profile.provider, providerID: profile.id});
                if (res) {
                    res.email = profile.emails[0].value || '';
                    res.name = profile.displayName;
                    res.avatar = profile.photos[0].value;

                    await res.save();
                    const payload = {user: {_id: res._id}};
                    return done(null, payload);
                }

                const newUser = new User({
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                    provider: profile.provider
                });

                const saved = await newUser.save();
                const payload = {user: {_id: saved._id}};
                return done(null, payload);


            } catch (err) {
                console.log(err, 'facebook');
            }
        }
    ));


    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: '/api/auth/github/callback'
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const res = await User.findOne({provider: profile.provider, providerID: profile.id});
                if (res) {
                    res.name = profile.username;
                    res.avatar = profile.photos[0].value;
                    await res.save();
                    const payload = {user: {_id: res._id}};
                    return done(null, payload);
                }

                const newUser = new User({
                    name: profile.username,
                    avatar: profile.photos[0].value,
                    provider: profile.provider,
                    providerID: profile.id
                });

                const saved = await newUser.save();
                const payload = {user: {_id: saved._id}};
                return done(null, payload);


            } catch (err) {
                console.log(err);
            }
        }
    ));


    passport.use(new GoogleStrategy({
            clientID: process.env.GOGGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: "/api/auth/google/callback"
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const res = await User.findOne({provider: profile.provider, providerID: profile.id});
                if (res) {

                    res.name = profile.displayName;
                    res.avatar = profile.photos[0].value;

                    await res.save();
                    const payload = {user: {_id: res._id}};
                    return done(null, payload);
                }

                const newUser = new User({
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                    provider: profile.provider,
                    providerID: profile.id
                });

                const saved = await newUser.save();
                const payload = {user: {_id: saved._id}};
                return done(null, payload);


            } catch (err) {
                console.log(err);
            }

        }
    ));


    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_ID,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "/api/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_basicprofile'],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const res = await User.findOne({provider: profile.provider, providerID: profile.id});
            if (res) {
                res.name = profile.displayName;
                res.avatar = profile.photos[0].value;
                res.email = profile.emails[0].value;
                await res.save();
                const payload = {user: {_id: res._id}};
                return done(null, payload);
            }

            const newUser = new User({
                name: profile.displayName,
                avatar: profile.photos[0].value,
                email: profile.emails[0].value,
                provider: profile.provider
            });

            const saved = await newUser.save();
            const payload = {user: {_id: saved._id}};
            return done(null, payload);

        } catch (err) {
            console.log(err);
        }
    }));


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });


};


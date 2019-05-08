const User = require('../models/Users');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = passport => {
    // passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //     User.findById(jwt_payload.id)
    //         .then(user => {
    //             if (user) {
    //                 return done(null, user);
    //             }
    //             return done(null, false);
    //         })
    // }));


    // passport.use(new FacebookStrategy({
    //         clientID: process.env.FACEBOOK_ID,
    //         clientSecret: process.env.FACEBOOK_SECRET,
    //         callbackURL: '/api/auth/facebook/callback',
    //         profileFields: ['id', 'name', 'picture.width(500)', 'emails', 'displayName'],
    //     }, (accessToken, refreshToken, profile, done) => {
    //
    //     User.findOne({provider: 'facebook', providerID: profile.id})
    //             .then(user => {
    //
    //                 if (user) {
    //                     user.name = profile.displayName;
    //                     user.email = profile.emails[0].value;
    //                     user.avatar = profile.photos[0].value;
    //                     user.save()
    //                         .then(user => {
    //                             return done(null, user);
    //                         })
    //                         .catch(err => {
    //                             console.log(err);
    //                         })
    //                 } else {
    //                     return done(null, false);
    //                 }
    //             })
    //     }
    // ));



    // passport.use(new GitHubStrategy({
    //         clientID: process.env.GITHUB_CLIENT,
    //         clientSecret: process.env.GITHUB_SECRET,
    //         callbackURL: "/api/users/login/github/callback"
    //     },
    //     function(accessToken, refreshToken, profile, cb) {
    //         console.log(profile, 'github');
    //     }
    // ));
    //
    //
    //
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
                    const payload = {user: {_id: res._id }};
                    return done(null, {payload});
                }


            } catch (err) {
                console.log(err);
            }
            
        }
    ));
    //
    //
    // passport.use(new LinkedInStrategy({
    //     clientID: process.env.LINKEDIN_ID,
    //     clientSecret: process.env.LINKEDIN_SECRET,
    //     callbackURL: "/api/users/login/linkedin/callback",
    //     scope: ['r_emailaddress', 'r_basicprofile'],
    // }, function(accessToken, refreshToken, profile, done) {
    //     // asynchronous verification, for effect...
    //     process.nextTick(function () {
    //         // To keep the example simple, the user's LinkedIn profile is returned to
    //         // represent the logged-in user. In a typical application, you would want
    //         // to associate the LinkedIn account with a user record in your database,
    //         // and return that user instead.
    //         console.log(profile, 'linkedin');
    //         return done(null, profile);
    //     });
    // }));


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });


};


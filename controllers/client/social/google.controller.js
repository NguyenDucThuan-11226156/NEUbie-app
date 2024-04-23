require("dotenv").config();
const googleHelper = require("../../../helpers/google.helpers");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports.configLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_APP_CLIENT_ID,
        clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
        callbackURL: process.env.DOMAIN_GOOGLE,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const type = "GOOGLE";
        let dataRaw = {
          fullName: profile.displayName,
          email:
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : "",
          googleId: profile.id,
        };
        let user = await googleHelper.upsertUserSocialMedia(type, dataRaw);
        return cb(null, user);
      }
    )
  );
};

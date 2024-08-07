const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Token_Key } = require("../config/config");
const { findTeacherByUsername } = require("../services/Teacher.service");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Token_Key.Private_key
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await findTeacherByUsername({ username: payload.username });
        console.log(user);

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

module.exports = (passport) => {
    passport.use(jwtStrategy);
};
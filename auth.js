// This has to be the same key used in the JWTStrategy
const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

// Your local passport file
require('./passport');


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    // This is the username you’re encoding in the JWT
    subject: user.Username,
    // This specifies that the token will expire in 7 days
    expiresIn: '7d',
    // This is the algorithm used to “sign” or encode the values of the JWT
    algorithm: 'HS256'
  });
}

/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); // "Same syntac but in ES6"= res.json({ user: user, token: token })
      });
    })(req, res);
  });
}

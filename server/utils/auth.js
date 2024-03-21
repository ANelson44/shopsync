const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET_KEY;


module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extentions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token
            .split(' ')
            .pop()
            .trim();
        }
    
        console.log("token", token)
    
    
        if (!token) {
          return req;
        }
    
        try {
          const { data } = jwt.verify(token, secret);
          req.user = data;
        }
        catch {
          console.log('Invalid token');
        }
    
        return req;
      },
      signToken: function ({ firstName, email, _id }) {
        const payload = { firstName, email, _id };
    
        return jwt.sign(
          { data: payload },
          secret
        );
      }
    };
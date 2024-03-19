const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = '...';


module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extentions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
        return jwt.sign({ data: payload }, secret );
    },
};
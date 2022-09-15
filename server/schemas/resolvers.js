const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('savedProperties');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async(parent, { email, password }) => { //email, password?
            const user = await User.findOne({ email });
            if (!user) throw new AuthenticationError('Incorrect credentials');

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) throw new AuthenticationError('Incorrect credentials');

            const token = signToken(user);
            return { token, user };
        },
        saveProperty: async(parent, {input}, context) => {
            if (context.user) {
                const userPropertyUpdate = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: {saveProperty: input }},
                    { new: true, runValidators: true }
                );
                return userPropertyUpdate;
            }
            throw new AuthenticationError('Login to save a new book');
        },
        removeProperty: async(parent, {propertyId}, context) => {
            if (context.user) {
                const userPropertyUpdate = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedProperties: { propertyId: propertyId } }},
                    { new: true }
                );
                return userPropertyUpdate;
            }
            throw new AuthenticationError('Login to remove a property from your list')
        }
    }
}

module.exports = resolvers;
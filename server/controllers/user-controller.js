const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });
        
        if (!foundUser) {
            return res.status(400).json({message: "cannot find a user with this id!"});
        }

        res.json(foundUser);
    },

    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({message: "Something is wrong!" })
        }
        const token = signToken (user);
        res.json({ token, user });
    },

    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] }); //email was included
        if (!user) {
            return res.status(400).json({ message: "Cant find this user" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: "wrong password"})
        }
        const token = signToken(user);
        res.json({ token, user })
    },

    async saveProperty({ user, body }, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedProperties: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    async deleteProperty({ user, params }, res ) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedProperties: {propertyId: params.propertyId} } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'couldnt find user with that id!'});
        }
        return res.json(updatedUser);
    }
}
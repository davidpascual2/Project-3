const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema?

const userSchema = new Schema({
    // id: { //is ID needed?
    //     type: Integer,
    //     required: true,

    // },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//custom method to compare and validate password for loggin in 
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//add in additonal custom methods as needed here

const User = model('User', userSchema);

model.exports = User;
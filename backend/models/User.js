const mongoose = require('mongoose')
const bcrpyt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Error: Please enter your name"],
        maxLength: [50, "Error: Please limit your name to 50 characters or less"],
    },
    email: {
        type: String,
        required: [true, "Error: Please enter a valid email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Error: Please enter your password"],
        minLength: [8, "Error: Please enter a password that is at least 8 characters long"]
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
}, {
    timestamps: true
})

//Encrpyting password for security purposes
userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrpyt.hash(this.password, 10)
})

module.exports = mongoose.model('User', userSchema)
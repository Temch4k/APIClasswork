const passport = require("passport");
passportLocalMongoose = require("passport-local-mongoose");

const mongoose = require("mongoose"),
    Subscriber = require("./subscriber"),
    Course = require("./course"),
    userSchema = mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        zipCode: {
            type: Number,
            min: [10000, "Zip code too short"],
            max: [99999]
        },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: Course }],
        subscribedAccount: { type: mongoose.Schema.Types.ObjectId, ref: Subscriber }
        },
    {
        timestamps: true
    }
)

userSchema.pre("save", function (next) {
    let user = this;
    if (user.subscribedAccount == undefined) {
        Subscriber.findOne({
            email: user.email
        })
            .then(subscriber => {
                user.subscribedAccount = subscriber;
                next();
            })
            .catch(error => {
                console.log(`error in associating subscriber: ${error.message}`);
                next(error);
            })
    }
    else {
        next();
    }
})

userSchema.plugin(passportLocalMongoose,{
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
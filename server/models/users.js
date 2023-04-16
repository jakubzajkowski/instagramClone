const mongoose = require('../db/db')


const Users = mongoose.model('users', {
    email: {
        type: String,
        require: true,
    },
    number: {
        type: Number,
    },
    full_name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    about: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now 
    },
    password: {
        type: String,
        require: true,
        min: [6, 'Must be at least 6 charcters, got {VALUE}'],
    },
    friends: {
        type: [String],
    },
    gender: {
        type: String,
        default: 'people',
    },
    followers: {
        type:[String],
    },
    avatar: {
        type: String,
        default: '/uploads/user.png',
    },
    posts: [
        {img: {
            type: String,
        },
        note: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: [String],
        },
        comments: [
            {
                content: {type: String},
                user: {type: String},
                avatar: {type: String},
                date: {type: Date, default: Date.now}
            },
        ],
    }
    ]
});

module.exports= Users
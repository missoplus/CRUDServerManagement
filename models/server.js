const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {now} = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const serverSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    port:{
        type:Number,
        trim: true,
        required: true,

    },
    ip:{
        type: String,
        trim: true,
        required: true,

    },
    created_at: {
        type: Date,
        trim: true,
        required: true
    },
    _groupId:{

        type: mongoose.Types.ObjectId,

        required: true

    },
    _userId:{

        type: mongoose.Types.ObjectId,

        required: true

    }
});
module.exports = mongoose.model('server', serverSchema)
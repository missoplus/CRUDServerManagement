const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    _userId:{

        type: mongoose.Types.ObjectId,

        required: true

    }
});
module.exports = mongoose.model('group', groupSchema)
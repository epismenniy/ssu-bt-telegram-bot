/**
 * Created by epismenniy on 01.08.2017.
 */

let mongoose = require('mongoose');
let db = require('../configs/configs').db;

mongoose.connect(db);
mongoose.Promise = global.Promise;

let BugSchema = mongoose.Schema({

    bugId: {
        type: String
    },

    file_name: {
        type: String
    },

    file_id : {
        type: String
    },

    caption: {
        type: String
    },

    description: {
        type: String
    },

    coordinates: {
        type: Array
    },

    user: {
        type: Object
    },

    date: {
        type: String
    }

});

module.exports = mongoose.model('Bug', BugSchema);

module.exports.createBug = function(newBug, callback){
    newBug.save(callback);
};
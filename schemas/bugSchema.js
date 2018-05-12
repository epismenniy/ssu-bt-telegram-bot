/**
 * Created by epysmennyi on 01.08.2017.
 */

let mongoose = require('mongoose');
let database = require('../configs/configs').db;

mongoose.connect(database);
mongoose.Promise = global.Promise;

let BugSchema = mongoose.Schema({

    bugId: {
        type: String
    },

    author: {
        type: Object
    },

    date: {
        type: String
    },

    location: {
        type: Object
    },

    description: {
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

    status: {
        type: String
    },

    rating:{
        type: Number
    }
});

module.exports = mongoose.model('Bug', BugSchema);

module.exports.createBug = function(newBug, callback){
    newBug.save(callback);
};
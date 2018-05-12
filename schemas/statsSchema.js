/**
 * Created by epysmennyi on 01.08.2017.
 */

let mongoose = require('mongoose');
let db = require('../configs/configs').db;

mongoose.createConnection(db);
mongoose.Promise = global.Promise;

let StatsSchema = mongoose.Schema({

    countsId:{
        type: Number
    },

    usersCount: {
        type: Number
    }
});

module.exports = mongoose.model('Stats', StatsSchema);

module.exports.createStatistic = function(newStats, callback){
    newStats.save(callback);
};
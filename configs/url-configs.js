/**
 * Created by epismenniy on 22.08.2017.
 */


let url_configs = {

    hostname : 'http://127.0.0.1:5000/',
    api_url : 'https://api.telegram.org/bot',

    upload_url : function () {
        return this.hostname + 'savePic';
    },

    single_bug_url : function () {
       return this.hostname + 'bug/';
    },
}

module.exports = url_configs;
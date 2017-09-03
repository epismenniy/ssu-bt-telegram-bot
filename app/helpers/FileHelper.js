/**
 * Created by epismenniy on 01.08.2017.
 */

const FileHelper = {

    //generate random 4-digit number
    getRandNumber: function() {
        return Math.floor(Math.random()*1000+8999);
    },

    //generate random 4-letter word
    getRandText: function(number) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < number; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text.toUpperCase();
    },
    
    //generate keyboard-format array
    keyboardFormat : function (arr, keyboardArray) {

        if(keyboardArray.length > 0) {
            keyboardArray.length = 0;
        }
        arr.forEach(function (item, i, arr) {
            keyboardArray.push([{text: item}]);
        })
    },

    notificationText: function (str, from, to, bugUrl, bugId,) {
        if(str.length > 50) {
            str = str.substring(from, to) + '... ' + '\n\n' + bugUrl + bugId;
        } else {
            str = str + '\n\n' + bugUrl + bugId;
        }

        return str;
    }

}

module.exports = FileHelper;
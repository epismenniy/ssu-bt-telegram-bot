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

    substrDescription: function (str, from, to) {
        str = str.substring(from, to) + '\n\n';
        return str;
    }

}

module.exports = FileHelper;
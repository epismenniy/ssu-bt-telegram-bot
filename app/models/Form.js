/**
 * Created by epismenniy on 01.08.2017.
 */

const locationsObj = require("../catalogs/locations");
const fileHelper = require('../helpers/FileHelper');

let locationsArray = Object.keys(locationsObj.locations);
let locationKeyboards = [];
let roomKeyboards = [];
let currentLocation = null;

fileHelper.keyboardFormat(locationsArray, locationKeyboards);

const form = {

    file_id: {
        q: 'Відправте фото багу',
        error: 'Помилка введення',
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.photo) {
                let photoInfo =  null;
                let PHOTO_SIZE_ID = message.photo.length - 1;

                if(message.caption !== null ) {
                    photoInfo = [];
                    photoInfo.push(message.photo[PHOTO_SIZE_ID]._fileId);
                    photoInfo.push(message.caption);
                } else {
                    photoInfo = message.photo[PHOTO_SIZE_ID]._fileId;
                }

                callback(true, photoInfo) //you must pass the result also
                return
            } else if(message.document && message.document._thumb !== null){
                //console.log(message.document);
                callback(true, message.document._fileName) //you must pass the result also
                return
            }
            callback(false)
        }
    },

    building: {
        q: 'Відправте корпус багу',
        error: 'Помилка введення',
        keyboard: locationKeyboards,
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }
            if(message.text) {

                let location = locationsObj.locations[message.text];

                if(typeof(location) === "undefined"){
                    callback(false)
                }else{

                    fileHelper.keyboardFormat(location, roomKeyboards);

                    currentLocation = message.text;
                    callback(true, currentLocation)
                }

                return
            }
            callback(false)
        }
    },


    room: {
        q: 'Виберіть аудиторію або точнішу локацію',
        error: 'Помилка введення',
        keyboard: roomKeyboards,
        validator: (message, callback) => {

            let room = message.text;

            if (room && room === '/stop') {
                return // return without running callback
            }

            if(room) {

                if(locationsObj["locations"].hasOwnProperty(currentLocation)) {

                    callback(true, room)

                } else {
                    console.log("hasn't own property")
                    callback(false)
                }

                return
            }

            callback(false)
        }
    },

    description: {
        q: 'Детальний опис проблеми',
        error: 'Вибачте, помилка введення',

        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.text) {
                //console.log(message.text);

                let description = [];

                description.push(message.text);
                description.push(message.from);
                description.push(message.date);

                callback(true, description)
                return
            }
            callback(false)
        }
    },


}

module.exports = form;

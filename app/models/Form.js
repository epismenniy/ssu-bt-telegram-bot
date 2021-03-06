/**
 * Created by epysmennyi on 01.08.2017.
 */

const locationsObj = require("../catalogs/locations");
const fileHelper = require('../helpers/FileHelper');
const emoji = require('node-emoji');

let locationsArray = Object.keys(locationsObj.locations);
let locationKeyboards = [];
let roomKeyboards = [];
let currentLocation = null;

fileHelper.keyboardFormat(locationsArray, locationKeyboards);

const form = {

    file_id: {
        q: 'Відправте фото багу ' + emoji.get('camera_with_flash'),
        error:  emoji.get('x') + ' Невірний формат фото',
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if (message.photo) {
                let photoInfo = null;
                let PHOTO_SIZE_ID = message.photo.length - 1;

                if (message.caption !== null) {
                    photoInfo = [];
                    photoInfo.push(message.photo[PHOTO_SIZE_ID]._fileId);
                    photoInfo.push(message.caption);
                } else {
                    photoInfo = message.photo[PHOTO_SIZE_ID]._fileId;
                }

                callback(true, photoInfo) //you must pass the result also
                return
            } /*else if (message.document && message.document._thumb !== null) {
                //console.log(message.document);
                callback(true, message.document._fileName) //you must pass the result also
                return
            }*/
            callback(false)
        }
    },

    building: {
        q: 'Оберіть корпус ' + emoji.get('factory'),
        error: emoji.get('x') + ' Помилка введення',
        keyboard: locationKeyboards,
        resize_keyboard:true,
        one_time_keyboard:true,
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }
            if (message.text) {

                let location = locationsObj.locations[message.text];

                if (typeof(location) === "undefined") {
                    callback(false)
                } else {

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
        q: 'Оберіть аудиторію ' + emoji.get('office'),
        error: emoji.get('x') + ' Помилка введення',
        keyboard: roomKeyboards,
        resize_keyboard:true,
        one_time_keyboard:true,
        validator: (message, callback) => {

            let room = message.text;

            if (room && room === '/stop') {
                return // return without running callback
            }

            if (room) {

                if (locationsObj["locations"].hasOwnProperty(currentLocation)) {
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
        q: 'Опишіть проблему ' + emoji.get('point_down'),
        error: emoji.get('x') + ' Помилка введення',
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if (message.text) {
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

/**
 * Created by epismenniy on 01.08.2017.
 */

const locationsObj = require("../catalogs/locations");
const roomsObj = require("../catalogs/rooms");

let locKeys = [];
let locRooms = [];

locationsObj.forEach(function (item, i, locationsObj) {
    locKeys.push([{text: item}]);
});

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


/*    data: {
        q: 'Відправте місцезнаходження багу',
        error: 'Вибачте, помилка введення',
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.location) {

                let coord = [];
                let lat = message.location.latitude;
                let long = message.location.longitude;
                coord.push(lat);
                coord.push(long);
                coord.push(message.from);
                coord.push(message.date);

                callback(true, coord)
                return
            }
            callback(false)
        }
    },*/

    location: {
        q: 'Відправте корпус багу',
        error: 'Помилка введення',
        keyboard: locKeys,
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.text) {
                //console.log(message.text);

                let location = roomsObj.locations[message.text];

                if(typeof(location) === "undefined"){
                    callback(false)
                }else{
                   // console.log(location);
                    callback(true, location)
                }

                return
            }
            callback(false)
        }
    },


    room: {
        q: 'Виберіть аудиторію або точнішу локацію',
        error: 'Помилка введення',
        keyboard: null,
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.text) {

                let room = message.text;

                if(locRooms.includes(room)) {

                    console.log(room);
                    callback(true, location)
                }

                return
            }

            callback(false)
        }
    },

    description: {
        q: 'Опишіть баг',
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

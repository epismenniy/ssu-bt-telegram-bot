/**
 * Created by epismenniy on 01.08.2017.
 */

const PHOTO_SIZE_ID = 3;

const form = {

    file_id: {
        q: 'Відправте фото багу',
        error: 'Помилка введення',
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            //console.log(message.photo);
            //return

            //console.log(message.document);
            if(message.photo) {
                //console.log(message.photo)
                // console.log(message.photo[0]._fileId);
                let photoInfo =  null;
                if(message.caption !== null ) {
                    photoInfo = [];
                    photoInfo.push(message.photo[PHOTO_SIZE_ID]._fileId)
                    photoInfo.push(message.caption);
                } else {
                    photoInfo = message.photo[PHOTO_SIZE_ID]._fileId
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

    description: {
        q: 'Опишіть баг',
        error: 'Вибачте, помилка введення',
        keyboard: [
            [{ text: 'Soltero'}],
            [{ text: 'Casado' }],
            [{ text: 'Divorciado' }],
        ],
        validator: (message, callback) => {

            if (message.text && message.text === '/stop') {
                return // return without running callback
            }

            if(message.text) {
                //console.log(message.text);
                callback(true, message.text)
                return
            }
            callback(false)
        }
    },
    data: {
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
    },
}

module.exports = form;

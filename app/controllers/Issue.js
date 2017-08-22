/**
 * Created by epismenniy on 01.08.2017.
 */
const request = require("request");


const Telegram = require('telegram-node-bot');
const Form = require('../models/Form');
const fileHelper = require('../helpers/FileHelper');
let Bug = require('../../schemas/bugSchema');

const configs = require('../../configs/configs');
const url_configs =  require('../../configs/url-configs');
const chnl_configs =  require('../../configs/channel-configs');

const UPLOAD_URL = url_configs.upload_url();

//notification constants
const NOTIFICATION_CHANNEL_MESSAGE = chnl_configs.notification_channel_message;
const CHAT_ID = chnl_configs.chat_id;
const SINGLE_BUG_URL = url_configs.single_bug_url();


class IssueController extends Telegram.TelegramBaseController {

    bugHandler($) {

        //bug
        $.runForm(Form, (result) => {

            let urlGetFile = url_configs.api_url + configs.token + '/getFile?file_id=';

            if(Array.isArray(result.file_id)) {
                urlGetFile += result.file_id[0];
            } else {
                urlGetFile += result.file_id;
            }

            request({
                url: urlGetFile,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    //console.log(body.result.file_path) // Print the json response

                    let file_path = body.result.file_path.split('/');
                    file_path = file_path[1];

                    let current_file = file_path.split('.');
                    let file_name = current_file[0];
                    let file_extension = '.' + current_file[1];
                    let file_name_id = fileHelper.getRandText(4) + fileHelper.getRandNumber();

                    result.file_name = file_name_id + file_extension;
                    result.bugId = file_name_id;

                    let download_url = 'https://api.telegram.org/file/bot' + configs.token + '/photos//' + file_name  + file_extension;

                    //check: is file_id an array
                    let caption = null;
                    let file_id = result.file_id;

                    if(Array.isArray(result.file_id)) {
                        file_id = result.file_id[0];
                        caption = result.file_id[1]
                    }

                    let locationObj = {

                        building : result.building,
                        room : result.room
                    }

                    let newBug = new Bug({

                        bugId: result.bugId,

                        author : result.description[1],

                        date : result.description[2],

                        location : locationObj,

                        description : result.description[0],

                        file_name: result.file_name,

                        file_id : file_id,

                        caption : caption,

                        status : "not_reviewed",

                        rating: 0

                    });

                    Bug.createBug(newBug, function (err, bug) {
                        if(err)  {

                            console.log(err + ' created bug error');
                            errorMessage();

                        } else {

                            let options = {
                                reply_markup: JSON.stringify({
                                    one_time_keyboard: true,
                                    keyboard: [['/bug']],
                                })
                            }

                            $.sendMessage(`Ваш баг №${result.bugId} був успішно відправлений! Після модерації баг буде опублікований на сайті \n`, options);


                            // Post request to clientside server to download pic to static folder
                            request.post(
                                UPLOAD_URL,
                                { json: { src: download_url, filename: result.file_name} },
                                function (error, response, body) {
                                    console.log(response.statusCode);
                                    if (error && response.statusCode != 200) {
                                        console.log('client server error');
                                        errorMessage();
                                    }
                                }
                            );


                            request.post(
                                NOTIFICATION_CHANNEL_MESSAGE,
                                { json: { chat_id: CHAT_ID, text:  SINGLE_BUG_URL + result.bugId} },
                                function (error, response, body) {
                                    if(error && response.statusCode != 200) {
                                        console.log('client server error');
                                        errorMessage();
                                    }
                                }

                            );
                        }
                    })

                } else {
                    console.log('Error: ' + response.statusCode);
                    errorMessage();
                }
            });

            let errorMessage = function () {
                return $.sendMessage('Помилка сервера. Спробуйте пізніше(');
            }

        })
    }

    helpHandler($) {

        let options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: 'Перейти на сайт багів',
                        url: url_configs.hostname
                    }]
                ]
            })
        }

        $.sendMessage(`Для того, щоб записати баг, виконайте наступні команди: \n\n 1. Введіть команду /bug\n 2. Відправте фото багу\n 3. Виберіть корпус\n 3.Виберіть аудиторію\n 4.Опишіть детально\n\n Готово!) \n `, options);
    }

    aboutHandler($) {
        $.sendMessage('SumyBugTrackerBot записує та відправляє баги на сайт www.sumybugs.com \n  ');
    }

    get routes() {
        return {
            'bugCommand': 'bugHandler',
            'helpCommand' : 'helpHandler',
            'aboutCommand' : 'aboutHandler'
        };
    }

}

module.exports = IssueController;

/**
 * Created by epismenniy on 01.08.2017.
 */
const request = require("request");

const Telegram = require('telegram-node-bot');
const emoji = require('node-emoji');
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
                                    inline_keyboard:
                                        [
                                            [{
                                                text: 'Перейти на сайт багів  ' + emoji.get('fire'),
                                                url: url_configs.hostname
                                            }]
                                        ],

                                })
                            }

                            $.sendMessage(`Ваш баг №${result.bugId} був успішно відправлений! ` + emoji.get('volcano') + ` Після модерації баг буде опублікований на сайті \n\n `+ emoji.get('question') +` Допомога: /help \n\n ` + emoji.get('bomb') + ` Записати баг: /bug`, options);


                            // Post request to clientside server to download pic to static folder
                            request.post(
                                UPLOAD_URL,
                                { json: { src: download_url, filename: result.file_name} },
                                function (error, response, body) {
                                    console.log(UPLOAD_URL);
                                    console.log(response.statusCode);
                                    if (error && response.statusCode != 200) {
                                        console.log('client server error');
                                        errorMessage();
                                    }
                                }
                            );


                            if(chnl_configs.allow){
                                request.post(
                                    NOTIFICATION_CHANNEL_MESSAGE,
                                    { json: { chat_id: CHAT_ID, text:  fileHelper.notificationText(result.description[0], 0, 50, SINGLE_BUG_URL, result.bugId)} },
                                    function (error, response, body) {
                                        if(error && response.statusCode != 200) {
                                            console.log('client server error');
                                            errorMessage();
                                        }
                                    }

                                );
                            }
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

    bughuntersHandler($) {
        //bughunters
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
                    };

                    let newBugHunter = {
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
                    };

                    let newBug = new Bug(newBugHunter);

                    Bug.createBug(newBug, function (err, bug){
                        if(err){
                            console.log('Bug Hunter save error', err);
                        }
                    });

                    request.post({
                        url:configs.bughunter,
                        json:newBugHunter
                    },  function (err, response) {
                        if(err)  {
                            console.log(err + ' created bug error');
                            errorMessage();

                        } else {
                            let options = {
                                reply_markup: JSON.stringify({
                                    one_time_keyboard: true,
                                    inline_keyboard:
                                        [
                                            [{
                                                text: 'Перейти на сайт багів  ' + emoji.get('fire'),
                                                url: url_configs.bughunter_url
                                            }]
                                        ],

                                })
                            }

                            $.sendMessage(`Ваш баг №${result.bugId} був успішно відправлений! ` + emoji.get('volcano') + ` Після модерації баг буде опублікований на сайті \n\n `+ emoji.get('question') +` Допомога: /help \n\n ` + emoji.get('bomb') + ` Записати баг: /hunters`, options);


                            // Post request to clientside server to download pic to static folder
                            request.post(
                                UPLOAD_URL,
                                { json: { src: download_url, filename: result.file_name} },
                                function (error, response, body) {
                                    if (error && response.statusCode != 200) {
                                        console.log('client server error');
                                        errorMessage();
                                    }else {
                                        request.post({
                                            url:configs.bughunterIp,
                                            json: {
                                                "bugId" : result.bugId
                                            }

                                        },function (err,res) {
                                            if(err)  {
                                                console.log(err + ' request error');
                                                errorMessage();

                                            }
                                        });
                                    }
                                }
                            );
                        }
                    });


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
                        text: 'Перейти на сайт багів ' + emoji.get('fire'),
                        url: url_configs.hostname
                    }]
                ]
            })
        }

        $.sendMessage(emoji.get('earth_americas') + `Щоб прийняти участь у квесті "Bughunters|Ловці багів"  виконайте наступні команди:\n\n 1. Введіть команду /hunters  та виконайте пункти 2-5 \n\nДля того, щоб анонімно записати баг, виконайте наступні команди: \n\n 1. Введіть команду /bug\n 2. Відправте фото багу (а не котиків) `+ emoji.get('cat') +` \n 3. Виберіть корпус\n 4. Виберіть аудиторію\n 5. Опишіть детально\n\n Готово! `+ emoji.get('rocket') +` \n\n `+  emoji.get('black_square_for_stop') + ` Зупинити запис багу - /stop `, options);
    }

    aboutHandler($) {
        $.sendMessage(emoji.get('helicopter') + ' SSU BugTrackerBot анонімно записує та відправляє баги на сайт ' + url_configs.hostname+' \n  ');
    }

    contactHandler($) {
        $.sendMessage(emoji.get('palm_tree') + ' Просто напишіть їм: \n\n@epysmennyi ' + emoji.get('evergreen_tree') + '\n@vladhoncharenko '+ emoji.get('rainbow'));
    }

    startHandler($) {
        let Stats = require('../../schemas/statsSchema');

        let startMessage = function () {
            let options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{
                            text: 'Перейти на сайт багів '+ emoji.get('fire'),
                            url: url_configs.hostname
                        }]
                    ]
                })
            }
            $.sendMessage(`Привіт! `+ emoji.get('hand') + `\n\n ` + emoji.get('earth_americas') + ` Щоб прийняти участь у квесті "Bughunters|Ловці багів"  виконайте наступні команди:\n\n 1. Введіть команду /hunters  та виконайте пункти 2-5\n\n Для того, щоб анонімно записати баг, виконайте наступні команди: \n\n 1. Введіть команду /bug\n 2. Відправте фото багу (а не котиків) `+ emoji.get('cat') +` \n 3. Виберіть корпус\n 4. Виберіть аудиторію\n 5. Опишіть детально\n\n Готово! `+ emoji.get('rocket') +` \n\n `+  emoji.get('black_square_for_stop') + ` Зупинити запис багу - /stop `, options);

        }

        Stats.findOne({'countsId': 1}, function (err, statsSchema) {
            if (err) console.log(err);
            return statsSchema;
        }).then(
            statsSchema => {

                if(statsSchema != null){
                    let numberUsers = statsSchema.usersCount;
                    let newNumberUsers = numberUsers + 1;

                    let myquery = { usersCount: numberUsers };
                    let newvalues = {$set: {usersCount: newNumberUsers} };
                    Stats.updateOne(myquery, newvalues, function(err, res) {
                        if (err) throw err;
                        startMessage();
                    });

                } else {

                    let newStats = new Stats({
                        countsId:1,
                        usersCount:30
                    });

                    Stats.createStatistic(newStats, function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            startMessage();
                        }
                    });
                }

            }
        );
    }

    get routes() {
        return {
            'bugCommand': 'bugHandler',
            'bughuntersCommand': 'bughuntersHandler',
            'helpCommand' : 'helpHandler',
            'aboutCommand' : 'aboutHandler',
            'startCommand' : 'startHandler',
            'contactCommand' : 'contactHandler'
        };
    }

}

module.exports = IssueController;

/**
 * Created by epismenniy on 01.08.2017.
 */

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($){
        let options = {
            reply_markup: JSON.stringify({
                one_time_keyboard: true,
                inline_keyboard: [['/bug']],

                hide_keyboard: true,
            })
        }

        $.sendMessage("Для початку роботи натисніть кнопку /bug", options)
    }
}

module.exports = OtherwiseController;

/**
 * Created by epismenniy on 01.08.2017.
 */

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($){
        $.sendMessage("Для початку роботи, введіть команду /bug")
    }
}

module.exports = OtherwiseController;

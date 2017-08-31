/**
 * Created by epismenniy on 01.08.2017.
 */

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($){
              $.sendMessage("Записати баг: /bug\n\n Допомога: /help")
    }
}

module.exports = OtherwiseController;

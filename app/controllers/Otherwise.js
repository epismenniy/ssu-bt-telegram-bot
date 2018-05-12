/**
 * Created by epysmennyi on 01.08.2017.
 */

const Telegram = require('telegram-node-bot');
const emoji = require('node-emoji');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($){
              $.sendMessage(emoji.get('bomb') + " Записати баг: /bug\n\n " + emoji.get('question') + " Допомога: /help");
    }
}

module.exports = OtherwiseController;

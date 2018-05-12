/**
 * Created by epysmennyi on 22.08.2017.
 */

const configs  = require('./configs');
const url_configs  = require('./url-configs');

const channel_configs = {
    notification_channel_message : url_configs.api_url + configs.token + '/sendMessage',
    chat_id : '-1001139310479',
}

module.exports = channel_configs;

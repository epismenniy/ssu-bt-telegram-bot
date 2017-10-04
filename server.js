'use strict';

const TOKEN = require('./configs/configs').token;

const Telegram = require('telegram-node-bot'),
    tg = new Telegram.Telegram(TOKEN, {
        workers: 1,
    });

const OtherwiseController = require('./app/controllers/Otherwise')
    , IssueController = require('./app/controllers/Issue');


const issueCtrl = new IssueController();

tg.router
    .when(new Telegram.TextCommand('/bug', 'bugCommand'), issueCtrl)
    .when(new Telegram.TextCommand('/help', 'helpCommand'), issueCtrl)
    .when(new Telegram.TextCommand('/about', 'aboutCommand'), issueCtrl)
    .when(new Telegram.TextCommand('/start', 'startCommand'), issueCtrl)
    .when(new Telegram.TextCommand('/contact', 'contactCommand'), issueCtrl)
    .otherwise(new OtherwiseController());

function exitHandler(exitCode) {

    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
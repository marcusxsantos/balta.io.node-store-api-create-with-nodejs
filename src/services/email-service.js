'use strict'

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgrigKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'marcusvx@hotmail.com',
        subject: subject,
        body: body
    });
}
const Joi = require('joi');
const regexPattern = /^[a-zA-Z]*$/;

const validMsgSchema = Joi.object({
    text: Joi.string().regex(regexPattern).min(1).max(10).required()
});

module.exports = validMsgSchema;
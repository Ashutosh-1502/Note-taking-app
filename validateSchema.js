const joi = require('joi');

module.exports.noteSchema = joi.object({
    title : joi.string().required(),
    Note : joi.string().required(),
})

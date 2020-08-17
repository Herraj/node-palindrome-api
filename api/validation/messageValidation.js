/** 
 * This file contains all the validation middleware
 * */

const validMsgSchema = require('./validationSchema');
const mongoose = require('mongoose');
const Message = require("../models/message");


const isValidReqBody = async (req, res, next) => {
    try {
        await validMsgSchema.validateAsync(req.body);
        next();
    } catch (err) {
        console.log(err)
        if (err.isJoi) {
            return res.status(422).json({
                "error": err.message
            });
        } else return res.status(err.status).json(err);
    }

}

const isValidMessageId = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.messageId)) {
        next();
    } else {
        res.status(422).json({
            "error": "Invalid message id bharwayyy"
        });
    }
}

const messageExists = async (req, res, next) => {
    try {
        const docCount = await Message.collection.countDocuments({
            _id: new mongoose.Types.ObjectId(req.params.messageId)
        })
        if (docCount > 0) {
            next();
        } else {
            res.status(404).json({
                "error": "Hai hi nahi gandu"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(err.status).json({
            "error": err
        })
    }
}

const isDuplicateMessage = async (req, res, next) => {
    try {
        const docCount = await Message.collection.countDocuments({
            "text": req.body.text
        })
        if (docCount === 0) {
            next();
        } else {
            res.status(422).json({
                "error": "Message string already exists"
            });
        }
    } catch (err) {
        console.log(err)
        res.status(err.status).json({
            "error": err
        })
    }
}

exports.isValidReqBody = isValidReqBody;
exports.isValidMessageId = isValidMessageId;
exports.messageExists = messageExists;
exports.isDuplicateMessage = isDuplicateMessage;
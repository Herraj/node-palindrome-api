const express = require("express");
const messageRouter = express.Router();
const MessagesController =  require('../controllers/messages.js');
 
 /**
 * @api {get} /messages/ List all messages
 * @apiName Get All Messages
 * @apiGroup Messages
 *
 * @apiSuccess {Object} response object containing count and messages attributes
 * @apiSuccess {Number} Count Number of messages
 * @apiSuccess {Array} Messages Array of all messages
 * @apiSuccess {Number} _id unique message id genereated by MongoDB
 * @apiSuccess {String} text message string
 * @apiSuccess {boolean} isPalindrome  True or false if a message is a palindrome or not
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 200 OK
 * {
    "count": 2,
    "messages": [
        {
            "_id": "5f35cf51bab0d61138c201de",
            "text": "random test pelo",
            "isPalindrome": false
        },
        {
            "_id": "5f35e01459b1b32cf4895807",
            "text": "sonos",
            "isPalindrome": true
        }
    ]
    }
 */
 messageRouter.get("/", MessagesController.getAllMessages);


/**
 * @api {get} /messages/:messageId Get message details for <messageId>
 * @apiName Get Message
 * @apiGroup Messages
 *
 *
 * @apiSuccess {Object} response object containing message object
 * @apiSuccess {Object} message object containing details of message
 * @apiSuccess {Number} _id unique id genereated by MongoDB
 * @apiSuccess {String} text message string
 * @apiSuccess {boolean} isPalindrome  True or false if a message is a palindrome or not
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 200 OK
 * {
    "message": {
        "_id": "5f35e2071be3d02e8c64b345",
        "text": "rotor",
        "isPalindrome": true
    }
    }
 */
 messageRouter.get("/:messageId", MessagesController.getMessage);

/**
 * @api {post} /messages/ Create new message 
 * @apiName Post Message
 * @apiGroup Messages
 *
 * @apiParam {String} text Message string
 *
 * @apiSuccess {Object} response object containing note attribute & message object
 * @apiSuccess {Object} message object containing details of message
 * @apiSuccess {Number} _id unique id genereated by MongoDB
 * @apiSuccess {String} text message string
 * @apiSuccess {boolean} isPalindrome True or false if a message is a palindrome or not
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 201 OK
 *{
    "note": "Message created",
    "message": {
        "_id": "5f363e34560760349c665a44",
        "text": "Fifa",
        "isPalindrome": false
    }
    }   
 */
 messageRouter.post("/", MessagesController.createMessage);


/**
 * @api {patch} /messages/:messageId updates message with <messageId> 
 * @apiName Update Message
 * @apiGroup Messages
 *
 * @apiParam {String} text Message string
 *
 * @apiSuccess {Object} response object containing note & details attribute
 * @apiSuccess {String} note text showing api call result 
 * @apiSuccess {String} details url to updated message for details
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 200 OK
 *{
    "note": "Message updated",
    "details": "http://localhost:3000/messages/5f35e2081be3d02e8c64b346"} 
 */
 messageRouter.patch("/:messageId", MessagesController.updateMessage);


 /**
 * @api {delete} /messages/:messageId updates message with <messageId> 
 * @apiName Delete Message
 * @apiGroup Messages
 *
 * @apiParam {Number} _id Message id for to be deleted message
 *
 * @apiSuccess {Object} response object containing note attribute
 * @apiSuccess {String} note text showing api call result 
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 200 OK
 *{
    "note": "Message updated",
    "details": "http://localhost:3000/messages/5f35e2081be3d02e8c64b346"} 
 */
 messageRouter.delete("/:messageId", MessagesController.deleteMessage);

module.exports = messageRouter;
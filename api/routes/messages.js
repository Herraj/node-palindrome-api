const express = require("express");
const messageRouter = express.Router();
const MessagesController = require('../controllers/messages.js');
const messageValidation = require('../validation/messageValidation');

/**
* @api {get} /messages/ List all messages
* @apiName Get All Messages
* @apiGroup Messages
*
* @apiSuccess {json} response object containing count and messages attributes
* @apiSuccess {Number} Count Number of messages
* @apiSuccess {Array} Messages Array of all messages
* @apiSuccess {Number} _id unique message id genereated by MongoDB
* @apiSuccess {String} text message string
* @apiSuccess {boolean} isPalindrome  True or false if a message is a palindrome or not
* @apiSuccess {Date} dateCreated date time when the message was created
* @apiSuccess {Date} lastModified date time when the message was last modified  
*
* @apiSuccessExample {json} Success Response Object
* HTTP/1.1 200 OK
* {
   "count": 2,
   "messages": [
        {
            "_id": "5f3892af4edfa104d0c172cf",
            "text": "cob",
            "isPalindrome": false,
            "dateCreated": "2020-08-16T01:58:07.000Z",
            "lastModified": "2020-08-16T01:58:07.000Z"
        },
        {
            "_id": "5f3895ba4d4168305406e2aa",
            "text": "rotor",
            "isPalindrome": true,
            "dateCreated": "2020-08-16T02:11:06.755Z",
            "lastModified": "2020-08-16T02:11:06.755Z"
        },
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
 * @apiSuccess {json} response object containing message object
 * @apiSuccess {json} message object containing details of message
 * @apiSuccess {Number} _id unique id genereated by MongoDB
 * @apiSuccess {String} text message string
 * @apiSuccess {boolean} isPalindrome  True or false if a message is a palindrome or not
 * @apiSuccess {Date} dateCreated date time when the message was created
 * @apiSuccess {Date} lastModified date time when the message was last modified
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 200 OK
 * {
    "message": {
        "_id": "5f38924b95feeb33689f65ac",
        "text": "rob",
        "isPalindrome": false,
        "dateCreated": "2020-08-16T01:56:27.000Z",
        "lastModified": "2020-08-16T01:56:27.000Z"
    }
    }
 */
messageRouter.get("/:messageId",
    messageValidation.isValidMessageId,
    messageValidation.messageExists,
    MessagesController.getMessage);

/**
 * @api {post} /messages/ Create new message 
 * @apiName Post Message
 * @apiGroup Messages
 *
 * @apiParam {String} text Message string
 *
 * @apiSuccess {json} response object containing note attribute & message object
 * @apiSuccess {json} message object containing details of message
 * @apiSuccess {Number} _id unique id genereated by MongoDB
 * @apiSuccess {String} text message string
 * @apiSuccess {boolean} isPalindrome True or false if a message is a palindrome or not
 * @apiSuccess {Date} dateCreated date time when the message was created
 * @apiSuccess {Date} lastModified date time when the message was last modified
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 201 OK
 *{
    "note": "Message successfully created:",
    "message": {
        "_id": "5f3ac3407b8ac837842af351",
        "text": "sonos",
        "isPalindrome": true,
        "dateCreated": "2020-08-17T17:49:52.052Z",
        "lastModified": "2020-08-17T17:49:52.052Z"
    }
    }   
 */
messageRouter.post("/",
    messageValidation.isValidReqBody,
    messageValidation.isDuplicateMessage,
    MessagesController.createMessage);


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
 * HTTP/1.1 204 OK
 */
messageRouter.patch("/:messageId",
    messageValidation.isValidMessageId,
    messageValidation.isValidReqBody,
    messageValidation.messageExists,
    messageValidation.isDuplicateMessage,
    MessagesController.updateMessage);


/**
 * @api {delete} /messages/:messageId updates message with <messageId> 
 * @apiName Delete Message
 * @apiGroup Messages
 *
 * @apiParam {Number} _id Message id for to be deleted message
 * 
 * @apiSuccessExample {json} Success Response Object
 * HTTP/1.1 204 OK
 */
messageRouter.delete("/:messageId",
    messageValidation.isValidMessageId,
    messageValidation.messageExists,
    MessagesController.deleteMessage);

module.exports = messageRouter;
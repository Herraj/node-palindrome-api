const express = require("express");
const messageRouter = express.Router();

const MessagesController =  require('../controllers/messages.js');
/**
 * API ROUTES BELOW
 */
 
 messageRouter.get("/", MessagesController.getAllMessages);

 messageRouter.get("/:messageId", MessagesController.getMessage);

 messageRouter.post("/", MessagesController.createMessage);

 messageRouter.patch("/:messageId", MessagesController.updateMessage);

 messageRouter.delete("/:messageId", MessagesController.deleteMessage);

module.exports = messageRouter;
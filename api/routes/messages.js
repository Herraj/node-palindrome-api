const express = require("express");
const router = express.Router();

const MessagesController =  require('../controllers/messages.js');
/**
 * API ROUTES BELOW
 */

 //TODO: 
router.get("/", MessagesController.getAllMessages);

router.get("/:messageId", MessagesController.getMessage);

router.get("/palindromes", )

router.get("/nonpalindromes", )

router.post("/", MessagesController.createMessage);

router.patch("/:messageId", MessagesController.updateMessage);

router.delete("/:messageId", MessagesController.deleteMessage);

module.exports = router;
const mongoose = require("mongoose");
const Message = require("../models/message");

//TODO: add get palindromes + non palindromes functions

const getAllMessages = (req, res, next) => {
  Message.find()
    .select("id text isPalindrome")
    .exec()
    .then(items => {
      const response = {
        count: items.length,
        messages: items.map(item => {
          return {
            id: item.id,
            text: item.text,
            isPalindrome: item.isPalindrome
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

const getMessage = (req, res, next) => {
    const id = req.params.messageId;
    Message.findById(id)
      .select("id text isPalindrome")
      .exec()
      .then(item => {
        console.log("Database query result: ", item);
        
        if (item) {
          res.status(200).json({
            message: item
          });
        } else {
          res.status(404).json({ message: "No entry found" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
const createMessage = (req, res, next) => {
  const message = new Message({
    id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    isPalindrome: isPalindrome(req.body.text)
  });

  message.save().then(result => {
      console.log(result);
      res.status(201).json({
        note: "Message created",
        message: {
          id: result.id,
          text: result.text,
          isPalindrome: result.isPalindrome
          }
        })
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

const updateMessage = (req, res, next) => {
  const msgId = req.params.messageId;
  
  //array to store all update operations
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Message.update({ id: msgId }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        note: "Message updated",
        details: "http://localhost:3000/messages/" + msgId
        })
      })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

const deleteMessage = (req, res, next) => {
  const msgId = req.params.messageId;
  Message.remove({ id: msgId })
    .exec()
    .then(result => {
      res.status(200).json({
        note: "Message deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

//Helper function to find palindrome
const isPalindrome = message =>{
    const cleanMsg = message.toLowerCase().replace(/[\W_]/g, '');
    const msgChars = cleanMsg.split('');

    for(let c of msgChars){
        if(c !== msgChars.pop()){
            return false;
        }
    }
    return true;
}

//export all controller functions
exports.getAllMessages = getAllMessages;
exports.getMessage = getMessage;
exports.createMessage = createMessage;
exports.updateMessage = updateMessage;
exports.deleteMessage = deleteMessage;
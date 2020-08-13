const mongoose = require("mongoose");
const Message = require("../models/message");

/**
 * TODO:
 * Update mongo functions to latest 
 * */

const getAllMessages = (req, res, next) => {
  Message.find()
    .select("id text isPalindrome")
    .exec()
    .then(items => {
      const response = {
        count: items.length,
        messages: items.map(item => {
          return {
            _id: item._id,
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
  const msgId = req.params.messageId;
  Message.findById(msgId)
    .select("id text isPalindrome")
    .exec()
    .then(item => {
      console.log("Database query result: ", item);
      if (item) {
        res.status(200).json({
          message: item
        });
      } else {
        res.status(404).json({ note: "No entry found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Invalid Id" });
    });
};

const createMessage = (req, res, next) => {
  if (req.body.text) {
    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      isPalindrome: isPalindrome(req.body.text)
    });

    message.save().then(result => {
      console.log(result);
      res.status(201).json({
        note: "Message created",
        message: {
          _id: result._id,
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

  }
  else {
    res.status(500).json({ "Error": "No body with 'text' attribute" })

  }


};

const updateMessage = (req, res, next) => {
  if (req.body.text && Message.exists({ _id: req.params.messageId })) {
    const msgId = req.params.messageId;
    const newText = req.body.text;

    Message.updateOne({ _id: msgId }, { $set: { text: newText } })
      .exec()
      .then(result => {
        res.status(200).json({
          note: "Message updated",
          details: "http://localhost:3000/messages/" + msgId
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });

  }
  else {
    res.status(500).json({ "Error": "Invalid id or missing request body" });
  }

};

const deleteMessage = (req, res, next) => {
  if (Message.exists({ _id: req.params.messageId })) {
    const msgId = req.params.messageId;
    Message.remove({ _id: msgId })
      .exec()
      .then(result => {
        res.status(200).json({
          note: "Message deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
  else {
    res.status(500).json({ error: "Message with id:" + req.params.messageId + "does not exist" });
  }

}

//Helper function to determin palindrome
const isPalindrome = message => {
  const cleanMsg = message.toLowerCase().replace(/[\W_]/g, '');
  const msgChars = cleanMsg.split('');

  for (let c of msgChars) {
    if (c !== msgChars.pop()) {
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
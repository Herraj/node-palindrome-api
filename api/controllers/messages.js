const mongoose = require("mongoose");
const Message = require("../models/message");

// GET/messages/ controller
const getAllMessages = (req, res, next) => {
  // Setting up filter,sort,pagination options
  const defaultResultsLimit = 5;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || defaultResultsLimit;
  const startIndex = (page - 1) * limit
  //const endIndex = page * limit
  let match = {};
  let sortBy = {};

  if (req.query.order_by) {
    sortBy.text = req.query.order_by === 'desc' ? -1 : 1;
  }

  if (req.query.isPalindrome) {
    match.isPalindrome = req.query.isPalindrome === 'true'
  }

  // Get all messages based on above options
  Message.find(match)
    .limit(limit)
    .skip(startIndex)
    .sort(sortBy)
    .select("id text isPalindrome dateCreated lastModified")
    .exec()
    .then(items => {
      const response = {
        count: items.length,
        messages: items.map(item => {
          return {
            _id: item._id,
            text: item.text,
            isPalindrome: item.isPalindrome,
            dateCreated: item.dateCreated,
            lastModified: item.lastModified
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "[GET/messages]Something went wrong trying to fetch from the database, try again."
      });
    });
};

// GET/messages/:messageId controller
const getMessage = (req, res, next) => {
  const msgId = req.params.messageId;
  Message.findById(msgId)
    .select("id text isPalindrome dateCreated lastModified")
    .exec()
    .then(item => {
      console.log("Database query result: ", item);
      if (item) {
        res.status(200).json({
          message: item
        });
      } else {
        res.status(404).json({
          error: "[GET/messages/<id>] No message found with id: " + msgId
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: "[GET/messages/<id>] Something went wrong while fetching message: " + msgId + " try again"
      });
    });
};

// POST/messages/ controller
const createMessage = (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    text: req.body.text,
    isPalindrome: isPalindrome(req.body.text),
    dateCreated: new Date,
    lastModified: new Date
  });

  message.save().then(result => {
      console.log(result);
      res.status(201).json({
        note: "Message successfully created:",
        message: {
          _id: result._id,
          text: result.text,
          isPalindrome: result.isPalindrome,
          dateCreated: result.dateCreated,
          lastModified: result.lastModified
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "[POST/messages]Something went wrong trying to save to the database, try again."
      });
    });
};

// PATCH/messages/:messageId controller
const updateMessage = (req, res, next) => {
  const msgId = req.params.messageId;
  const newText = req.body.text;

  Message.updateOne({
      _id: msgId
    }, {
      $set: {
        text: newText,
        lastModified: new Date
      }
    })
    .exec()
    .then(result => {
      res.status(204);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "[PATCH/messages/<id>]Something went wrong while updating message: " + msgId + " try again."
      });
    });
}

// DELETE/messages/:messageId controller
const deleteMessage = (req, res, next) => {
  const msgId = req.params.messageId;
  Message.remove({
      _id: msgId
    })
    .exec()
    .then(result => {
      res.status(204)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "[DELETE/messages/<id>]Something went wrong while deleting message: " + msgId + " try again."
      });
    });
}

//Helper function to determine palindrome
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
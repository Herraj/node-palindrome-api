const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const messageSchema = require('../api/schemas/message');

chai.use(chaiHttp);
//Assertion style
chai.should();

// override default mongoose connection with test_db
mongoose.connect("mongodb+srv://hluhano:" + "hluhano55" + "@rajluhmongoatlas.9uqz3.mongodb.net/" + "test_db" + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create new connection to test_db
const dbcon = mongoose.createConnection("mongodb+srv://hluhano:" + "hluhano55" + "@rajluhmongoatlas.9uqz3.mongodb.net/" + "test_db" + "?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create new model for the new connection above
const Message = dbcon.model('Message', messageSchema);


before((done) => {
    // Message.remove({}).then(result => {
    //     console.log("emptied collection")
    // }).catch(err => {
    //     console.log(err);
    // })

    const testGetMsg = new Message({
        _id: mongoose.Types.ObjectId('5f3ad8721ae0b50ebd95633f'),
        text: "testGet",
        isPalindrome: false,
        dateCreated: new Date,
        lastModified: new Date
    });

    const testPatchMsg = new Message({
        _id: mongoose.Types.ObjectId('5f3ade1f1ae0b50ebd956340'),
        text: "testPatch",
        isPalindrome: false,
        dateCreated: new Date,
        lastModified: new Date
    });

    const testDeleteMsg = new Message({
        _id: mongoose.Types.ObjectId('5f3ae0ee1ae0b50ebd956341'),
        text: "testDel",
        isPalindrome: false,
        dateCreated: new Date,
        lastModified: new Date
    });

    Message.insertMany([testGetMsg, testPatchMsg, testDeleteMsg]).then(result => {
        console.log("Db seed successful");
    }).catch(err => {
        console.log(err);
    });

    done();
});


after(async () => {
    try {
        await Message.remove({});

    } catch (err) {
        console.log(err);
    }
    // Message.remove({}).then(result => {

    // }).catch(err => {
    //     console.log(err);
    // });

    dbcon.close().then(result => {
        console.log('Connection close');
    }).catch(err => {
        console.log(err);
    });

    mongoose.disconnect();
});



/**
 * Testing all end points
 * For development: run 'npm test' in console to run this test suite
 */

describe("Messages API", () => {
    /**
     * Test GET messages/
     */
    describe("GET messages/", () => {
        it("it should GET all messages", (done) => {
            chai.request(app)
                .get("/messages")
                .end((err, response) => {
                    const messageLength = response.body['messages'].length;

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('messages');
                    response.body.should.have.property('count').eq(messageLength);

                    done();
                });
        });
    });

    /**
     * Test GET messages/{id}
     */
    describe("GET messages/:messageId", () => {
        it("it should GET message with {id}", (done) => {
            const testMsgId = '5f3ad8721ae0b50ebd95633f';
            chai.request(app)
                .get("/messages/" + testMsgId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text');
                    response.body.should.have.property('message').have.property('isPalindrome');
                    response.body.should.have.property('message').have.property('dateCreated');
                    response.body.should.have.property('message').have.property('lastModified');

                    done();
                });
        });

        it("it should NOT GET message with non-existent {id}", (done) => {
            const invalidTestMsgId = '5f35cf51bab0d61138c201da';
            chai.request(app)
                .get("/messages/" + invalidTestMsgId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error')
                        .eq('Message does not exist with messageId: ' + invalidTestMsgId);

                    done();
                });
        });

        it("it should NOT GET message with invalid format {id}", (done) => {
            const invalidTestMsgId = 'invalidIdFormat';
            chai.request(app)
                .get("/messages/" + invalidTestMsgId)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error')
                        .eq('Invalid id format for messageId: ' + invalidTestMsgId);

                    done();
                });
        });
    });


    /**
     * Test POST messages/
     */
    describe("POST messages/", () => {
        it("it should create a palindrome message", (done) => {
            const message = {
                "text": "rotor"
            };
            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('note').eq("Message successfully created");
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text').eq(message.text);
                    response.body.should.have.property('message').have.property('isPalindrome').eq(true);
                    response.body.should.have.property('message').have.property('dateCreated');
                    response.body.should.have.property('message').have.property('lastModified');

                    done();
                });
        });

        it("it should create a non palindrome message", (done) => {
            const message = {
                "text": "ottawa"
            };

            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('note').eq("Message successfully created");
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text').eq(message.text);
                    response.body.should.have.property('message').have.property('isPalindrome').eq(false);
                    response.body.should.have.property('message').have.property('dateCreated');
                    response.body.should.have.property('message').have.property('lastModified');

                    done();
                });
        });

        it("it should NOT create a message with no 'text' in body", (done) => {
            const message = {};

            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error').eq("\"text\" is required");

                    done();
                });
        });

        it("it should NOT create a message with text longer than characters", (done) => {
            const message = {
                "text": "afghanistan"
            };

            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error')
                        .eq("\"text\" length must be less than or equal to 10 characters long");

                    done();
                });
        });

        it("it should NOT create a message with alphanumeric text", (done) => {
            const message = {
                "text": "test123"
            };

            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error')
                        .eq("\"text\" with value \"" + message.text + "\" fails to match the required pattern: /^[a-zA-Z]*$/");

                    done();
                });
        });

        it("it should NOT create a duplicate message", (done) => {
            const message = {
                "text": "ottawa"
            };

            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error').eq("Message string already exists");

                    done();
                });
        });

    });

    /**
     * Test PATCH messages/{id}
     */
    describe("PATCH messages/:messageId", () => {
        it("it should update an existing message", (done) => {
            const msgId = "5f3ade1f1ae0b50ebd956340";
            const updatedMessage = {
                "text": "testPatchp"
            };

            chai.request(app)
                .patch("/messages/" + msgId)
                .send(updatedMessage)
                .end((err, response) => {
                    response.should.have.status(204);
                    done();
                });
        });

        it("it should NOT update a message with no 'text' in request body", (done) => {
            const msgId = "5f3ade1f1ae0b50ebd956340";
            const updatedMessage = {};

            chai.request(app)
                .patch("/messages/" + msgId)
                .send(updatedMessage)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property('error').eq("\"text\" is required");

                    done();
                });
        });

        it("it should NOT update a message with text longer than 10 characters", (done) => {
            const msgId = "5f3ade1f1ae0b50ebd956340"
            const message = {
                "text": "afghanistan"
            };

            chai.request(app)
                .patch("/messages/" + msgId)
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error')
                        .eq("\"text\" length must be less than or equal to 10 characters long");

                    done();
                });
        });

        it("it should NOT update a message with alphanumeric text", (done) => {
            const msgId = "5f3ade1f1ae0b50ebd956340"
            const message = {
                "text": "test123"
            };

            chai.request(app)
                .patch("/messages/" + msgId)
                .send(message)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.have.property('error')
                        .eq("\"text\" with value \"" + message.text + "\" fails to match the required pattern: /^[a-zA-Z]*$/");

                    done();
                });
        });


    });
    /**
     * Test DELETE messages/{id}
     */
    describe("DELETE messages/:messageId", () => {
        it("it should delete an existing message", (done) => {
            const msgId = "5f3ae0ee1ae0b50ebd956341";
            chai.request(app)
                .delete("/messages/" + msgId)
                .end((err, response) => {
                    response.should.have.status(204);

                    done();
                });
        });

        it("it should NOT delete a non-existing message", (done) => {
            const msgId = "5f3895ba4d4168305406e2a1";
            chai.request(app)
                .delete("/messages/" + msgId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    response.body.should.have.property('error')
                        .eq("Message does not exist with messageId: " + msgId);

                    done();
                });
        });

        it("it should NOT delete a message with invalid message id", (done) => {
            const invalidMsgId = "5f35e90979e2a53338b11bbq";
            chai.request(app)
                .delete("/messages/" + invalidMsgId)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property('error')
                        .eq("Invalid id format for messageId: " + invalidMsgId);

                    done();
                });
        });
    });
});
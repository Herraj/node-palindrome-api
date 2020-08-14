const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

//Assertion style
chai.should();

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
            const testMsgId = '5f35cf51bab0d61138c201de';
            chai.request(app)
                .get("/messages/" + testMsgId)
                .end((err, response) => { 
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text');
                    response.body.should.have.property('message').have.property('isPalindrome');

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
                    response.body.should.have.property('note').eq('No entry found');

                done();
                });
        });

        it("it should NOT GET message with invalid format {id}", (done) => {
            const invalidTestMsgId = 'invalidIdFormat';
            chai.request(app)
                .get("/messages/" + invalidTestMsgId)
                .end((err, response) => { 
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error').eq('Invalid Id');

                done();
                });
        });
    });


    /**
     * Test POST messages/
     */
    describe("POST messages/:messageId", () => {
        it("it should create a palindrome message", (done) => {
            const message = {text: "rotor" };
            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('note').eq("Message created");
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text').eq(message.text);
                    response.body.should.have.property('message').have.property('isPalindrome').eq(true);
                    
                done();
                });
        });

        it("it should create a non palindrome message", (done) => {
            const message = { text: "non palindrome message test" };
    
            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.have.property('note').eq("Message created");
                    response.body.should.have.property('message').have.property('_id');
                    response.body.should.have.property('message').have.property('text').eq(message.text);
                    response.body.should.have.property('message').have.property('isPalindrome').eq(false);
                    
                done();
                });
        });

        it("it should NOT create a message with no request body", (done) => {
            const message = {};
    
            chai.request(app)
                .post("/messages")
                .send(message)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('Error').eq("No body with 'text' attribute");
                    
                done();
                });
        });

    });

    /**
     * Test PATCH messages/{id}
     */
    describe("PATCH messages/:messageId", () => {
        it("it should update an existing message", (done) => {
            const msgId = "5f35e90979e2a53338b11bb9";
            const updatedMessage = {"text": "updating test message"};
    
            chai.request(app)
                .patch("/messages/" + msgId)
                .send(updatedMessage)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('details');
                    response.body.should.have.property('note').eq("Message updated");
                    
                done();
                });
        });

        it("it should NOT update a message with invalid request body", (done) => {
            const msgId = "5f35e90979e2a53338b11bb9";
            const updatedMessage = {};
    
            chai.request(app)
                .patch("/messages/" + msgId)
                .send(updatedMessage)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have.property('Error').eq("missing 'text' attribute in request body");
                    
                done();
                });
        });
    });
    /**
     * Test DELETE messages/{id}
     */
    describe("DELETE messages/:messageId", () => {
        it("it should delete an existing message", (done) => {
            const msgId = "5f3602a480e7d62e0ccf1a7f";
            chai.request(app)
                .delete("/messages/" + msgId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property('note').eq("Message deleted");
                    
                done();
                });
        });

        it("it should NOT delete a message with invalid message id", (done) => {
            const invalidMsgId = "5f35e90979e2a53338b11bbq";
            chai.request(app)
                .delete("/messages/" + invalidMsgId)
                .end((err, response) => {
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    
                done();
                });
        });
    });
});

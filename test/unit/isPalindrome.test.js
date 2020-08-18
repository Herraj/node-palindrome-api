const messageController = require("../../api/controllers/messages");
const chai = require('chai');

//Assertion style
chai.should();

describe("isPalindrome function", () => {
    it("should return a palindrome", (done) => {
        const message = "civic";
        messageController.isPalindrome(message).should.eq(true);
        done();
    });

    it("should NOT return a palindrome", (done) => {
        const message = "adam";
        messageController.isPalindrome(message).should.eq(false);
        done();
    });

    it("should NOT return a palindrome with alphanumeric message", (done) => {
        const message = "a2d3a4m";
        messageController.isPalindrome(message).should.eq(false);
        done();
    });

    it("should return a palindrome with alphanumeric message", (done) => {
        const message = "c1v1c5";
        messageController.isPalindrome(message).should.eq(false);
        done();
    });

    it("should NOT return a palindrome with alphanumeric and special character message", (done) => {
        const message = "c!v1c$";
        messageController.isPalindrome(message).should.eq(false);
        done();
    });
});
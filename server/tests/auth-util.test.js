const expect = require("chai").expect;
const assert = require("assert");
const authUtil = require("../utils/auth-util");

// We won't be testing the generateRefreshToken() function, as it's the same as the access token and it's not used anywhere.
describe("Auth util", () => {

    let accessToken = null;

    describe("Generate access token", () => {

        it("Missing data - should fail", () => {
            const loginData = null;
            accessToken = authUtil.generateAccessToken(loginData);
            console.log("TEST123:" + accessToken);
            assert.equal(accessToken, null);
        });

        it("Valid data - should generate token", () => {
            const loginData = { username: "test", password: "test" };
            accessToken = authUtil.generateAccessToken(loginData);
            expect(accessToken).to.be.a("string");
        });

    });



    describe("Authenticate access token", () => {

        it("Valid token - should authenticate the token", () => {
            const authenticated = authUtil.authenticateToken(accessToken);
            expect(authenticated).to.be.a("boolean");
            expect(authenticated).to.eq(true);
        });

        it("Invalid token - should NOT authenticate the token", () => {
            const authenticated = authUtil.authenticateToken("ffJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE2Mjg0NTQyMDgsImV4cCI6MTYyODQ1NzgwOH0.bPIOjaN0_Ji90QwbLjooFxccslUKHbqxFpyqlcZpGBA");
            expect(authenticated).to.be.a("boolean");
            expect(authenticated).to.eq(false);
        });

        it("Invalid token format - should NOT authenticate the token", () => {
            const authenticated = authUtil.authenticateToken("InvalidToken.String");
            expect(authenticated).to.be.a("boolean");
            expect(authenticated).to.eq(false);
        });

    });

});

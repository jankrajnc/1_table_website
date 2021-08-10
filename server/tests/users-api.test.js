const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = require("chai").expect;
chai.use(chaiHttp);

let idSignup = null;
let accessTokenString = null;

describe("Cars API", () => {

    /*========================================================================================*/
    /* ===== POST API ===== */
    /*========================================================================================*/
    describe('POST /users API', () => {
        it('POST /users/signup - Valid data should save the user to the database', (done) => {
            const user = {
                username: "testUser",
                password: "testPassword"
            }
            chai.request(app)
                .post('/users/signup')
                .send(user)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(JSON.parse(res.text)["affectedRows"]).to.be.eq(1);
                    idSignup = JSON.parse(res.text)["insertId"];
                    done();
                });
        });

        /*it('POST /users/signup - Invalid data should NOT save the user to the database', (done) => {
            const user = {
                username: 12345,
                password: "testPassword"
            }
            chai.request(app)
                .post('/users/signup')
                .send(user)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(400);
                    expect(res.error.text).to.be.eq("Invalid POST data /signup");
                    done();
                });
        });*/

        it('POST /users/login - Valid data should authenticate', (done) => {
            const user = {
                username: "testUser",
                password: "testPassword"
            }
            chai.request(app)
                .post('/users/login')
                .send(user)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body["authenticated"]).to.be.a("boolean");
                    expect(res.body["authenticated"]).to.eq(true);
                    expect(res.body["accessToken"]).to.be.a("string");
                    accessTokenString = res.body["accessToken"];
                    done();
                });
        });

        it('POST /users/login - Invalid username should fail authentication', (done) => {
            const user = {
                username: "fakeUser",
                password: "testPassword"
            }
            chai.request(app)
                .post('/users/login')
                .send(user)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(400);
                    expect(res.error.text).to.be.eq("Invalid POST data /login")
                    done();
                });
        }).timeout(3000);

        it('POST /users/login - Invalid password should fail authentication', (done) => {
            const user = {
                username: "testUser",
                password: "fakePassword"
            }
            chai.request(app)
                .post('/users/login')
                .send(user)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body["authenticated"]).to.be.a("boolean");
                    expect(res.body["authenticated"]).to.eq(false);
                    done();
                });
        });

        it('POST /users/authorized - Valid access token should be authorized', (done) => {
            const accessTokenObject = { accessToken: accessTokenString };
            chai.request(app)
                .post('/users/authorize')
                .send(accessTokenObject)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body["authorized"]).to.be.a("boolean");
                    expect(res.body["authorized"]).to.eq(true);
                    done();
                });
        });

        it('POST /users/authorized - Invalid access token should NOT be authorized', (done) => {
            const accessTokenObject = { accessToken: `ff${accessTokenString}` };
            chai.request(app)
                .post('/users/authorize')
                .send(accessTokenObject)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body["authorized"]).to.be.a("boolean");
                    expect(res.body["authorized"]).to.eq(false);
                    done();
                });
        });

        it('POST /users/authorized - Invalid access token format should NOT be authorized', (done) => {
            const accessTokenObject = { accessToken: "InvalidToken.String" };
            chai.request(app)
                .post('/users/authorize')
                .send(accessTokenObject)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body["authorized"]).to.be.a("boolean");
                    expect(res.body["authorized"]).to.eq(false);
                    done();
                });
        });
    });

    /*========================================================================================*/
    /* ===== DELETE API ===== */
    /*========================================================================================*/
    describe('DELETE /users API', () => {
        it('DELETE /users/:id  - Should delete the user from the database', (done) => {
            chai.request(app)
                .delete(`/users/${idSignup}`)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});

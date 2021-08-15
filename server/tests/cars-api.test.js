const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = require("chai").expect;
chai.use(chaiHttp);

let idPost = null;

describe("Cars API", () => {

    /*========================================================================================*/
    /* ===== GET API ===== */
    /*========================================================================================*/
    describe("GET /cars API", () => {
        it("GET /car - Invalid router path should return 404", (done) => {
            chai.request(app)
                .get("/car")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(404);
                });
            done();
        });

        it("GET /cars - Should return all the cars in the array of objects format", (done) => {
            chai.request(app)
                .get("/cars")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    expect(res.body).to.be.an("array");
                    expect(res.body.length).to.be.greaterThan(0);
                });
            done();
        });

        it("GET /cars/:id - Should return a specific car as an object", (done) => {
            chai.request(app)
                .get("/cars/1")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body[0]).to.be.an("object");
                    expect(res.body.length).to.be.eq(1);
                    expect(res.body[0].id).to.be.eq(1);
                });
            done();
        });

        it("GET /cars/:id - Invalid ID should succeed, but return no data", (done) => {
            chai.request(app)
                .get("/cars/9999")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.empty;
                });
            done();
        });

        it("GET /cars/:id - SQL GET injection, should return one car only", (done) => {
            chai.request(app)
                .get("/cars/3 OR 1=1")
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.be.eq(1);
                });
            done();
        });

    });

    /*========================================================================================*/
    /* ===== POST API ===== */
    /*========================================================================================*/
    describe('POST /cars API', () => {
        it('POST /cars  - Valid data should save the car to the database', (done) => {
            const car = {
                brand: "Seat",
                make: "Alhambra",
                color: "Grey",
                ccs: 1800,
                hp: 125,
                price: 25000,
                electric: 0
            }
            chai.request(app)
                .post('/cars')
                .send(car)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(JSON.parse(res.text)["affectedRows"]).to.be.eq(1);
                    idPost = JSON.parse(res.text)["insertId"];
                    done();
                });
        });

        it('POST /cars - Invalid data should NOT save the car to the database', (done) => {
            const car = {
                brand: "Seat",
                make: 10,
                hp: 125,
                price: "25000",
                electric: true
            }
            chai.request(app)
                .post('/cars')
                .send(car)
                .end((err, res) => {
                    if (err) done(err);
                    console.log(err);
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    done();
                });
        });
    });

    /*========================================================================================*/
    /* ===== PUT API ===== */
    /*========================================================================================*/
    describe('PUT /cars API', () => {
        it('PUT /cars/:id  - Should update the car in the database', (done) => {
            const car = {
                price: Math.floor(Math.random() * 100000),
            }
            chai.request(app)
                .put(`/cars/${idPost}`)
                .send(car)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    expect(JSON.parse(res.text)["affectedRows"]).to.be.eq(1);
                    done();
                });
        });

        it('PUT /cars/:id - SQL injection - Should fail due to database settings', (done) => {
            const car = {
                price: Math.floor(Math.random() * 100000),
            }
            chai.request(app)
                .put('/cars/"105 OR 1=1"')
                .send(car)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(400);
                    expect(res).to.be.json;
                    expect(res).to.be.an("object");
                    done();
                });
        });

    });

    /*========================================================================================*/
    /* ===== DELETE API ===== */
    /*========================================================================================*/
    describe('DELETE /cars API', () => {
        it('DELETE /cars/:id  - Should delete the car from the database', (done) => {
            chai.request(app)
                .delete(`/cars/${idPost}`)
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});

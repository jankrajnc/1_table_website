const request = require("supertest");
const app = require("./app");

describe("TODO", () => {
    it("GET /cars => Return array of cars", () => {
        return request(app)
            .get("/cars")
            .expect("Content-Type", /json/)
            .expect(200)
            /*.then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            brand: expect.any("String"),
                            make: expect.any("String")
                        })
                    ]));
            });*/
    });

    it("GET /cars/id => Return a specific car", () => {
        return request(app)
            .get("/cars/1")
            .expect("Content-Type", /json/)
            .expect(200)
     });

    it("POST /cars => Create a new car", () => {
        return request(app)
            .post("/cars")
            .expect("Content-Type", /json/)
            .expect(200)
     });

    it("PUT /cars => Update an existing car", () => { });

    it("DELETE /cars => Delete a car", () => { });
});



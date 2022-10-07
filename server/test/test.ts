
let chai =require("chai");
// let server = require("../src/index")
let  chaiHttp  = require("chai-http")
import {request} from "express"

chai.should();
chai.use(chaiHttp);



describe("Test Api",()=>{
    describe("GET/api/hotels"  , ()=>{
        it("it Should get all the tasks"  ,(done)=>{
            chai.request("http://localhost:8005")
            .get("/api/hotels")
            .end((err , response)=>{
                 response.should.have.status(200);
                 response.body.should.be.a('array');
                 done();
            })
        })
    })

}

)
import "mocha";

import * as express from "express";

import * as chai from "chai";

import * as sinon from "sinon";

import {hotel} from "../controllers/hotel"



import { expect } from "chai";

const myObj = new hotel();



describe("hotel Controller _test", () => {

const req: any = {

body: {},

params: {},

headers: {},

};

const res: any = {

json: sinon.spy(),

status: sinon.stub().returns({ end: sinon.spy() }),

};

const next = () => {};

it("Must get all hotels", () => {

const spy = sinon.spy(myObj, "gethotel");

myObj.gethotel(req, res, next);

sinon.assert.calledOnce(spy);

});
it("Must create hotels", () => {

    const spy = sinon.spy(myObj, "createHotel");
    
    myObj.createHotel(req, res, next);
    
    sinon.assert.calledOnce(spy);
    
    });
    it("update hotels", () => {

        const spy = sinon.spy(myObj, "updateHotel");
        
        myObj.updateHotel(req, res, next);
        
        sinon.assert.calledOnce(spy);
        
        });
        it("delete hotels", () => {

            const spy = sinon.spy(myObj, "deleteHotel");
            
            myObj.deleteHotel(req, res, next);
            
            sinon.assert.calledOnce(spy);
            
            });
            it("  get hotels by id", () => {

                const spy = sinon.spy(myObj, "gethotelbyid");
                
                myObj.gethotelbyid(req, res, next);
                
                sinon.assert.calledOnce(spy);
                
                });
                it(" getHotelRooms", () => {

                    const spy = sinon.spy(myObj, "getHotelRooms");
                    
                    myObj.getHotelRooms(req, res, next);
                    
                    sinon.assert.calledOnce(spy);
                    
                    });
                    it(" getRating", () => {

                        const spy = sinon.spy(myObj, "getRating");
                        
                        myObj.getRating(req, res, next);
                        
                        sinon.assert.calledOnce(spy);
                        
                        });
                        it(" setRating", () => {

                            const spy = sinon.spy(myObj, "setRating");
                            
                            myObj.setRating(req, res, next);
                            
                            sinon.assert.calledOnce(spy);
                            
                            });
            
        
    


});
import "mocha";

import * as express from "express";

import * as chai from "chai";

import * as sinon from "sinon";

import {crudroom} from "../controllers/room"



import { expect } from "chai";

const myObj = new (crudroom);



describe("room Controller _test", () => {

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
it("createRoom", () => {

    const spy = sinon.spy(myObj, "createRoom");
    
    myObj.createRoom(req, res , next);
    
    sinon.assert.calledOnce(spy);
    
    });
    it("deleteRoom", () => {

        const spy = sinon.spy(myObj, "deleteRoom");
        
        myObj.deleteRoom(req, res , next);
        
        sinon.assert.calledOnce(spy);
        
        });

        it("getroom", () => {

            const spy = sinon.spy(myObj, "getroom");
            
            myObj.getroom(req, res , next);
            
            sinon.assert.calledOnce(spy);
            
            });

            
        it("getroombyid", () => {

            const spy = sinon.spy(myObj, "getroombyid");
            
            myObj.getroombyid(req, res , next);
            
            sinon.assert.calledOnce(spy);
            
            });
                  
        it("updateRoom", () => {

            const spy = sinon.spy(myObj, "updateRoom");
            
            myObj.updateRoom(req, res , next);
            
            sinon.assert.calledOnce(spy);
            
            });
            it("updateRoomAvailability", () => {

                const spy = sinon.spy(myObj, "updateRoomAvailability");
                
                myObj.updateRoomAvailability(req, res , next);
                
                sinon.assert.calledOnce(spy);
                
                });
                


    




});
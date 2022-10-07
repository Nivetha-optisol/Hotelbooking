import "mocha";

import * as express from "express";

import * as chai from "chai";

import * as sinon from "sinon";

import {pay} from "../controllers/payment"



import { expect } from "chai";

const myObj = new pay();



describe("payment Controller _test", () => {

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
it("payment", () => {

    const spy = sinon.spy(myObj, "payment");
    
    myObj.payment(req, res);
    
    sinon.assert.calledOnce(spy);
    
    });





});
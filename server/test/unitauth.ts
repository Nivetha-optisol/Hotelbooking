import "mocha";

import * as express from "express";

import * as chai from "chai";

import * as sinon from "sinon";

import {Authentication} from "../controllers/auth"



import { expect } from "chai";

const myObj = new (Authentication);



describe("Auth Controller _test", () => {

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

it(" GoogleSignIn", () => {

    const spy = sinon.spy(myObj, "GoogleSignIn");
    
    myObj.GoogleSignIn(req, res);
    
    sinon.assert.calledOnce(spy);
    
    });
    it("changePassword", () => {

        const spy = sinon.spy(myObj, "changePassword");
        
        myObj.changePassword(req, res);
        
        sinon.assert.calledOnce(spy);
        
        });
        it("emailVerified", () => {

            const spy = sinon.spy(myObj, "emailVerified");
            
            myObj.emailVerified(req, res);
            
            sinon.assert.calledOnce(spy);
            
            });

            it("register", () => {

                const spy = sinon.spy(myObj, "register");
                
                myObj.register(req, res,next);
                
                sinon.assert.calledOnce(spy);
                
                });
            
                it("login", () => {

                    const spy = sinon.spy(myObj, "login");
                    
                    myObj.login(req, res,next);
                    
                    sinon.assert.calledOnce(spy);
                    
                    });
                    it("verifyPasswordMail", () => {

                        const spy = sinon.spy(myObj, "verifyPasswordMail");
                        
                        myObj.verifyPasswordMail(req, res);
                        
                        sinon.assert.calledOnce(spy);
                        
                        });
                      

    





});

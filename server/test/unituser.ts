import "mocha";

import * as express from "express";

import * as chai from "chai";

import * as sinon from "sinon";

import { users } from "../controllers/user";

import { expect } from "chai";

const myObj = new users();

describe("user Controller _test", () => {
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
  it("getUsers", () => {
    const spy = sinon.spy(myObj, "getUsers");

    myObj.getUsers(req, res, next);

    sinon.assert.calledOnce(spy);
  });
  it("deleteUser", () => {
    const spy = sinon.spy(myObj, "deleteUser");

    myObj.deleteUser(req, res, next);

    sinon.assert.calledOnce(spy);
  });
  it("getUserbyid", () => {
    const spy = sinon.spy(myObj, "getUserbyid");

    myObj.getUserbyid(req, res, next);

    sinon.assert.calledOnce(spy);
  });
  it("updateUser", () => {
    const spy = sinon.spy(myObj, "updateUser");

    myObj.updateUser(req, res, next);

    sinon.assert.calledOnce(spy);
  });
});

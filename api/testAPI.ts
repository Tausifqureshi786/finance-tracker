import express from 'express';
var testAPIRouter = express.Router();


testAPIRouter.get("/", function(req,res,next) {
    res.send("Api is working properly")
})


export {testAPIRouter};
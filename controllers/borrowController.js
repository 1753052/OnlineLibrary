var models = require("../models");
var controller = {};
let Borrow= models.Borrow

controller.getAll= ()=>{
    return new Promise((resovle,reject)=>{
        Borrow
            .findAll()
            .then(data =>resovle(data))
            .catch(error => reject(new Error(error)));
    });
};

module.exports = controller;
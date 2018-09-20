'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.authenticate = async(data) => {
    var res = await Customer.findOne({
        email: data.email, password: data.password
    });
    return res;   
};

exports.create = async(data) => {
    var customer = new Customer(data);
    return await customer.save();   
};
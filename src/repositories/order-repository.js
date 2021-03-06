'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async(data) => {
    var res = await Order.find({}, 'name status customer itens')
        .populate('customer', 'name')
        .populate('itens.product', 'title');
    return res;   
};

exports.create = async(data) => {
    var order = new Order(data);
    return await order.save();   
};
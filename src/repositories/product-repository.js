'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    var res = Product
        .find({ 
            active: true 
        }, 'title price slug');

    return res;
};

exports.getBySlug = async(slug) => {
    return Product
    .findOne({ 
        slug: slug,
        active: true 
    }, 'title description price slug tags');    
};

exports.getById = async(id) => {
    return Product
    .findById(id);    
}

exports.getByTag = async(tag) => {
    return Product
    .find({ 
        tags: tag, 
        active: true 
    });    
};

exports.create = async(data) => {

    var product = new Product(data);

    return await product.save();    
};

exports.update = async(id, data) => {
    return await Product
    .findByIdAndUpdate(id, {
        $set : { 
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug }
    });
};

exports.delete = async(id) => {
    return await Product
    .findOneAndRemove(id);      
};
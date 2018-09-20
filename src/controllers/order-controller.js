'use strict'

const contract = require('../validators/validation-contract');
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    }    
};

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(200).send({ 
            message: 'Pedido incluído com sucesso'
        });
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao cadastrar Pedido',
            data: e
        });
    }
};
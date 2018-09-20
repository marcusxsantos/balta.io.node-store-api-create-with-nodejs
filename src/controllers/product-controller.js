'use strict'

const contract = require('../validators/validation-contract');
const repository = require('../repositories/product-repository');

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

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug); 
        res.status(201).send(data);   
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    }
};

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);   
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    } 
};

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);    
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    }
};

exports.post = async(req, res, next) => {

    // contract.hasMinLen(req.body.title, 3, 'O título precisa possuir ao menos 3 caracteres.');

    // if(!contract.isValid()){
    //     res.status(400).send(contract.errors()).end();
    //     return;
    // }
    try {
        await repository.create(req.body);
        res.status(200).send({ 
            message: 'Produto incluído com sucesso'
        });
    } catch (e) 
    {
        res.status(500).send({ 
            message: 'Erro ao cadastrar produto',
            data: e
        });
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body); 
        res.status(200).send({ 
            message: 'Produto atualizado com sucesso'
        }); 
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    }    
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);  
        res.status(200).send({ 
            message: 'Produto excluido com sucesso'
        });   
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao obter produtos',
            data: e
        });
    } 
};
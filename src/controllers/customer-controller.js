'use strict'

const contract = require('../validators/validation-contract');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(201).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Erro ao consultar cliente",
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
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(200).send({ 
            message: 'Cliente incluído com sucesso'
        });
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao cadastrar cliente',
            data: e
        });
    }
};

exports.authenticate = async(req, res, next) => {

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer)
        {
            res.status(404).send({ 
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        const token = await authService.generateToken({
            email: customer.email,
            name: customer.name
        });

        res.status(201).send({ 
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({ 
            message: 'Erro ao cadastrar cliente',
            data: e
        });
    }
};
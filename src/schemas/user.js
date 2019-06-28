const Joi = require('joi');

module.exports = Joi.object().keys({
  nome: Joi.string()
    .max(254)
    .required()
    .label('Nome'),
  email: Joi.string()
    .email()
    .required()
    .label('Email'),
  senha: Joi.string()
    .max(100)
    .label('Senha'),
  telefones: Joi.array().items({
    numero: Joi.string()
      .alphanum()
      .max(11)
      .label('numero'),
    ddd: Joi.string()
      .alphanum()
      .max(3)
      .label('ddd')
  }),
  CEP: Joi.string()
    .max(9)
    .label('CEP')
});

const express = require('express')
const {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
} = require('./Controladores/usuarios')
const { validarToken } = require('./Intermediarios/autenticacao')
const {
    validarSeEmailExisteParaOutroUsuario,
    validarEmail,
    validarCategoria,
    validarTipo,

} = require('./Intermediarios/validacoes')
const listaCategorias = require('./Controladores/categorias')
const { cadastrarTransacao, listarTransacoes, detalharTransacao } = require('./Controladores/transacoes')
const validarIdDoUsuarioLogado = require('./Intermediarios/validarId')

const rotas = express()

rotas.post('/usuario', validarSeEmailExisteParaOutroUsuario, cadastrarUsuario)
rotas.post('/login', validarEmail, login)

rotas.get('/usuario', validarToken, detalharUsuario) //a validação do token passou.
rotas.put('/usuario', validarToken, atualizarUsuario)//a validação do token passou.

rotas.get('/categoria', validarToken, listaCategorias)

rotas.post('/transacao', validarToken, validarCategoria, validarTipo, cadastrarTransacao)
rotas.get('/transacao', validarToken, listarTransacoes)
rotas.get('/transacao/:id', validarToken, validarIdDoUsuarioLogado, detalharTransacao)

module.exports = rotas
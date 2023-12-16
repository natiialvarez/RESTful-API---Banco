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
const { cadastrarTransacao, listarTransacoes, detalharTransacao, atualizarTransacao, excluirTransacao } = require('./Controladores/transacoes')
const validarIdDoUsuarioLogado = require('./Intermediarios/validarId')

const rotas = express()

rotas.post('/usuario', validarSeEmailExisteParaOutroUsuario, cadastrarUsuario)
rotas.post('/login', validarEmail, login)

rotas.get('/usuario', validarToken, detalharUsuario)
rotas.put('/usuario', validarToken, atualizarUsuario)

rotas.get('/categoria', validarToken, listaCategorias)

rotas.post('/transacao', validarToken, validarCategoria, validarTipo, cadastrarTransacao)
rotas.get('/transacao', validarToken, listarTransacoes)
rotas.get('/transacao/:id', validarToken, validarIdDoUsuarioLogado, detalharTransacao)
rotas.put('/transacao/:id', validarToken, validarIdDoUsuarioLogado, atualizarTransacao)
rotas.delete('/transacao/:id', validarToken, validarIdDoUsuarioLogado, excluirTransacao)

module.exports = rotas
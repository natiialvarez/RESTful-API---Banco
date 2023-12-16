const pool = require("../conexao")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require("../senhaJwt")

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, tipo, data, categoria_id } = req.body
    if (!descricao || !valor || !data) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatorios' })
    }
    try {
        const query = 'INSERT INTO transacoes (usuario_id, descricao, valor, data, categoria_id, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        const params = [req.usuario.id, descricao, valor, data, categoria_id, tipo]
        const novaTransacao = await pool.query(query, params)
        const transacao = {
            id: novaTransacao.rows[0].id,
            tipo,
            descricao,
            valor,
            data,
            usuario_id: novaTransacao.rows[0].usuario_id,
            categoria_id,
            categoria_nome: req.categoriaIdExiste.descricao
        }
        return res.status(200).json(transacao)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const listarTransacoes = async (req, res) => {
    //lembrar que é apenas a transação do usuario que esta logado, e não de todos
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params
    try {
        const query = 'SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, c.descricao AS categoria_nome, c.id AS categoria_id FROM transacoes t join categorias c on t.categoria_id = c.id WHERE t.id= $1 and t.usuario_id = $2'
        const params = [id, req.transacaoDetalhada.usuario_id]
        const transacaoEncontrada = await pool.query(query, params)
        return res.status(200).json(transacaoEncontrada.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao
}
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
    const id = req.usuario.id
    try {
        const query = 'SELECT * FROM transacoes WHERE usuario_id = $1'
        const params = [id]
        const transacoes = await pool.query(query, params)
        return res.status(200).json(transacoes.rows)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params
    try {
        const query = `SELECT t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, c.descricao AS categoria_nome, c.id AS categoria_id 
        FROM transacoes t join categorias c on t.categoria_id = c.id 
        WHERE t.id= $1 and t.usuario_id = $2`
        const params = [id, req.transacaoDetalhada.usuario_id]
        const transacaoEncontrada = await pool.query(query, params)
        return res.status(200).json(transacaoEncontrada.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const atualizarTransacao = async (req, res) => {
    const { id } = req.params
    try {
        const { descricao, valor, tipo, data, categoria_id } = req.body
        if (!descricao || !valor || !data || !tipo || !categoria_id) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatorios' })
        }
        const queryValidarCategoria = 'SELECT id FROM categorias WHERE  id = $1'
        const paramsValidarCategoria = [categoria_id]
        const validarCategoria = await pool.query(queryValidarCategoria, paramsValidarCategoria)
        if (validarCategoria.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Id da categoria não encontrado' })
        }
        const queryTransacao = 'SELECT * FROM transacoes WHERE id = $1'
        const paramsTransacao = [id]
        const transacao = await pool.query(queryTransacao, paramsTransacao)

        if (transacao.rows[0].tipo != tipo) {
            return res.status(400).json({ mensagem: "O tipo de transacao não corresponde a do banco de dados" })
        }
        const queryAtualizar = ' UPDATE transacoes SET descricao = $1, valor = $2, data = $3,categoria_id = $4 WHERE id = $5'
        const paramsAtualizar = [descricao, valor, data, categoria_id, id]
        const transacaoAtualizada = await pool.query(queryAtualizar, paramsAtualizar)
        console.log(transacaoAtualizada)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const excluirTransacao = async (req, res) => {
    const idUsuario = req.usuario.id
    const { id } = req.params
    try {
        const queryTransacao = 'DELETE FROM transacoes WHERE id = $1'
        const paramsTransacao = [id]
        const transacao = await pool.query(queryTransacao, paramsTransacao)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}
module.exports = {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao,
    atualizarTransacao,
    excluirTransacao
}
const pool = require("../conexao")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require("../senhaJwt")

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const query = 'INSERT INTO usuarios(nome,email,senha) VALUES($1,$2,$3) returning *'
        const params = [nome, email, senhaCriptografada]
        const { rows } = await pool.query(query, params)
        const { senha: _, ...usuario } = rows[0]
        return res.status(201).json(usuario)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const login = async (req, res) => {
    const { senha } = req.body
    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }
    try {
        const senhaValida = await bcrypt.compare(senha, req.usuarioLogado.senha)
        if (!senhaValida) {
            return res.status(400).json({ mensagem: ' senha invalida' })
        }
        const token = jwt.sign({ id: req.usuarioLogado.id }, senhaJwt, { expiresIn: '5d' })
        const { senha: _, ...usuarioLogado } = req.usuarioLogado
        return res.status(200).json({ Usuario: usuarioLogado, token })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const detalharUsuario = async (req, res) => {
    const id = req.usuario.id
    console.log(id)
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório' })
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }
    try {
        const usuarioLogado = req.usuario
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const query = 'UPDATE usuarios SET nome = $1 , email = $2 ,senha = $3 WHERE id = $4'
        const params = [nome, email, senhaCriptografada, usuarioLogado.id]
        const usuarioAtualizado = await pool.query(query, params)
        console.log(usuarioAtualizado.rows)
        return res.status(200).json(usuarioAtualizado.rows[0])
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
}
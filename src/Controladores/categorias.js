const pool = require("../conexao")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaJwt = require("../senhaJwt")

const listaCategorias = async (req, res) => {
    try {
        const query = 'SELECT * FROM categorias'
        const categorias = await pool.query(query)
        return res.status(200).json(categorias.rows)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = listaCategorias
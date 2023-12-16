const jwt = require('jsonwebtoken')
const pool = require('../conexao')
const senhaJwt = require('../senhaJwt')


const validarToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }
        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, senhaJwt)
        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])
        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }
        req.usuario = rows[0]
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Erro interno' })
    }
}


module.exports = { validarToken }
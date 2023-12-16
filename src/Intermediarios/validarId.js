const jwt = require('jsonwebtoken')
const pool = require('../conexao')
const senhaJwt = require('../senhaJwt')

const validarIdDoUsuarioLogado = async (req, res, next) => {
    const { id } = req.params
    try {
        const query = 'SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2'
        const params = [req.usuario.id, id]
        const transacoesUsuario = await pool.query(query, params)
        if (transacoesUsuario.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada para o usuário logado.' })
        }
        req.transacaoDetalhada = transacoesUsuario.rows[0]
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}


module.exports = validarIdDoUsuarioLogado
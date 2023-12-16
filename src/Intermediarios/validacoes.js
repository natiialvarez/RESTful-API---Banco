const pool = require("../conexao")
const validarSeEmailExisteParaOutroUsuario = async (req, res, next) => {
    const { email } = req.body
    try {
        const emailExiste = await pool.query('select * from usuarios where email = $1', [email]
        )

        if (emailExiste.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Email já existe' })
        }
        next()
    } catch (Erro) {
        return res.status(500).json({ mensagem: 'Erro interno ' })
    }
}

const validarEmail = async (req, res, next) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
    }
    try {
        const query = 'SELECT * FROM usuarios WHERE email = $1'
        const params = [email]
        const emailLogado = await pool.query(query, params)
        if (emailLogado.rowCount === 0) {
            return res.status(404).json({ mensagem: " email invalido" })
        }
        req.usuarioLogado = emailLogado.rows[0]
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const validarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body
    if (!categoria_id) {
        return res.status(400).json({ mensagem: 'O campo categoria é obrigatório' })
    }
    try {
        const query = 'SELECT * FROM categorias WHERE id = $1'
        const params = [categoria_id]
        const categoriaIdExiste = await pool.query(query, params)
        if (categoriaIdExiste.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }
        req.categoriaIdExiste = categoriaIdExiste.rows[0]
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const validarTipo = async (req, res, next) => {
    const { tipo } = req.body
    if (!tipo) {
        return res.status(400).json({ mensagem: 'O campo Tipo é obrigatório' })
    }
    try {
        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({ mensagem: 'O campo Tipo deve ser entrada ou saida' })
        }
        next()
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}



module.exports = {
    validarSeEmailExisteParaOutroUsuario,
    validarEmail,
    validarCategoria,
    validarTipo
}
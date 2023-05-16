const Usuario = require('../models/usuario');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById( uid );
    usuario.online = true;

    await usuario.save();

    return usuario;
}

const usuarioDeconectado = async (uid = '') => {

    const usuario = await Usuario.findById( uid );
    usuario.online = false;

    await usuario.save();

    return usuario;
}

module.exports = {
    usuarioConectado,
    usuarioDeconectado
}
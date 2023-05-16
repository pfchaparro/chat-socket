/**
 * path: /api/login
 */
const {Router} = require('express');
const {check} = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasña el obligatorio').not().isEmpty(),
    check('email', 'el correo el obligatorio').isEmail(),
    validarCampos
],crearUsuario);

router.post('/',[
    check('email', 'el correo el obligatorio').isEmail(),
    check('password', 'La contrasña el obligatorio').not().isEmpty(),
    validarCampos
],login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
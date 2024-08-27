//imports
const express = require('express');//importa el servidor
const router = express.Router();//monta las rutas
const usuarios = require('../models/usuarios')
const manejo = require('../controllers/auth')
const consulta = require('../controllers/baseMaestra')
const conteo = require('../controllers/conteo')
const file = require('../controllers/archivo_bm')

const session = require('express-session');

router.use(session({
    secret: '6FSRSDATEMRGYEAJLPCAWTUVL4SBHCPD',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

//redirige a la pogina principal
router.get('/', (req,res)=>{
    res.render('pages/');
});

router.get('/home', (req,res)=>{
    if(req.session.rol=='admin'){
        res.render('pages/homeAdmin')
    }else{
        res.render('pages/home')
    }
})

router.get('/baseMaestra', (req, res) => {
    conteo.basemaestra_c(req, {
        send: (count) => {
            res.render('pages/baseMaestra2', { resultados: count });
        },
        status: () => ({
            send: (error) => {
                res.status(500).send('Error al cargar la página');
            }
        })
    });
});

router.get('/count', conteo.basemaestra_c);
router.get('/file', file.basemaestra_file);

router.get('/creacion',(req,res) => {
    res.render('pages/creacionUsuarios')
})
router.post('/login',usuarios.LoginUsuarios)
router.get('/logout',usuarios.LogOutUsuarios)
router.get('/validar', usuarios.validarSesion)

router.get('/data', consulta.basemaestra);
router.get('/tableUsuarios',manejo.Usuarios);
router.post('/registrarU', manejo.RegistrarU);
router.post('/actualizarU', manejo.ActualizarU);
router.post('/eliminarU', manejo.EliminarU);

module.exports = router;

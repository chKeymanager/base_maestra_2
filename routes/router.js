//imports
const express = require('express');//importa el servidor
const router = express.Router();//monta las rutas
const conn = require('../controllers/db');//conecta a la base de datos MYSQL
const json2csv = require('json2csv').parse
const fs = require('fs')
const usuarios = require('../models/usuarios')
const manejo = require('../controllers/auth')
const consulta = require('../controllers/query')

const session = require('express-session');

router.use(session({
    secret: '6FSRSDATEMRGYEAJLPCAWTUVL4SBHCPD',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*5
    }
}));

//redirige a la pogina principal
router.get('/', (req,res)=>{
    res.render('pages/');
});

//redirige a la base maestra
router.get('/baseMaestra', (req,res)=>{
    res.render('pages/baseMaestra')
})

router.get('/home', (req,res)=>{
    if(req.session.rol=='admin'){
        res.render('pages/homeAdmin')
    }else{
        res.render('pages/home')
    }
})

router.get('/baseMaestra2', (req,res)=>{
    //console.log(req.session)
    res.render('pages/baseMaestra2')
})
router.get('/creacion',(req,res) => {
    res.render('pages/creacionUsuarios')
})
router.post('/login',usuarios.LoginUsuarios)
router.get('/logout',usuarios.LogOutUsuarios)
router.get('/validar', usuarios.validarSesion)

router.get('/data', consulta.query);
router.get('/tableUsuarios',manejo.Usuarios);
router.post('/registrarU', manejo.RegistrarU);
router.post('/actualizarU', manejo.ActualizarU);
router.post('/eliminarU', manejo.EliminarU);

module.exports = router;

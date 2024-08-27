const conn = require('../config/db');
const express = require('express');
const Buffer = require('buffer').Buffer;

const router = express.Router()


exports.LoginUsuarios = (req, res) => {
    const { usuario, contra } = req.body;
    const buff = Buffer.from(contra, 'utf-8').toString('base64');
    const query = `SELECT * FROM usuarios WHERE username = '${usuario}' AND password = '${buff}'`;

    conn.query(query, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error interno del servidor');
        }

        if (result.length > 0) {
            req.session.usuario = result[0].username;
            req.session.nombre = result[0].nombre;
            req.session.rol = result[0].rol;

            return res.redirect('/home');
        } else {
            console.log('Error: Usuario o Contraseña Incorrectos');
            return res.redirect('/');
        }
    });
};


exports.LogOutUsuarios = (req, res) => {
    //console.log('Entra logout');
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.clearCookie(req.session); // eliminar la cookie de sesión
            //console.log('session',req.session)
            res.redirect('/');
            // redirigir al usuario a la página de inicio de sesión
        }
    });
}

exports.validarSesion = (req,res) => {
    res.send(req.session)
}
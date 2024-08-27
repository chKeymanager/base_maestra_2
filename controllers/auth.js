const { response } = require('express');
const pool = require('../config/db');

/* Usuarios*/
Usuarios = async(req, res) => {
    const sql = ("select id,nombre,username,rol,password from usuarios");
    pool.query(sql,(error, rows, fileds) => {
        if(!error){
        const array1 = []
        for(const i in rows){
            array1.push([
                rows[i]['nombre'],
                rows[i]['username'],
                rows[i]['rol'],
                Buffer.from(rows[i]['password'],'base64').toString('utf-8'),
                `<a  class="button button-3d button-mini button-rounded modal-id-act-u" data-bs-toggle="modal" data-bs-target="#usuarioEditar" style="background-color: #EF7C10;" idux="${rows[i]['id']}" actax="${rows[i]['nombre']}" idusx="${rows[i]['username']}" llux="${rows[i]['rol']}" coux="${Buffer.from(rows[i]['password'],'base64').toString('utf-8')}" >Editar</a>
                <a  class="button button-3d button-mini button-rounded delete" data-idx="${rows[i]['id']}" style="background-color: rgba(255, 0, 0, 0.514); color: white;">Borrar</a>`
            ]);
        }
        res.send(array1);
        }else
        console.log(error)
    });
}
RegistrarU = async (req, res) =>{
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const roll = req.body.rol;
    const pass = Buffer.from(req.body.pass,'utf-8').toString('base64')
    const sql = (`INSERT INTO usuarios(nombre,username,rol,password) VALUES ("${nombre}","${usuario}","${roll}","${pass}")`);
    pool.query(sql,(error,result) => {
        if (error) {
            res.send({
                status: false
            });
        }else{
            res.send({
                status: true
            });
        }
    });
}
ActualizarU = async (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const roll = req.body.rol;
    //console.log(id,nombre,usuario,roll)
    const pass = Buffer.from(req.body.pass,'utf-8').toString('base64')
    const sql = (`UPDATE usuarios SET nombre = "${nombre}", username = "${usuario}", rol = "${roll}", password = "${pass}" WHERE id = "${id}";`)
    pool.query(sql,(error,result) => {
        if (error) {
            res.send({
                status: false
            });
        }else{
            res.send({
                status: true
            });
        }
    });
}
EliminarU = async (req, res) =>{
    const {action} = req.body
    if (action == 'delete') {
        const id = req.body.idux;
        const sql = (`DELETE FROM usuarios WHERE id = "${id}";`);
        pool.query(sql,(error,result) => {
            if (error){
                res.send({
                    'mensaje': 'Ocurrio un error al elimnar el usuario'
                })
            }else{
                res.send({
                    'mensaje': 'Usuario Eliminado '
                });
            }
        });
    }
}

module.exports = {Usuarios,RegistrarU,ActualizarU,EliminarU}
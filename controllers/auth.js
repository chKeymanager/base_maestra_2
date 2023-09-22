const { response } = require('express');
const conn = require('../controllers/db');
/* Usuarios*/
exports.Usuarios = async(req, res) => {
    const [usuarios] = await conn.query("select id,nombre,username,rol,password from usuarios")
    const data = []

    if(usuarios.length > 0) {
        for( const i in usuarios ) {
            data.push([
                usuarios[i]['nombre'],
                usuarios[i]['username'],
                usuarios[i]['rol'],
                Buffer.from(usuarios[i]['password'],'base64').toString('utf-8'),
                `<a  class="button button-3d button-mini button-rounded modal-id-act-u" data-bs-toggle="modal" data-bs-target="#usuarioEditar" style="background-color: #EF7C10;" idux="${usuarios[i]['id']}" actax="${usuarios[i]['nombre']}" idusx="${usuarios[i]['username']}" llux="${usuarios[i]['rol']}" coux="${Buffer.from(usuarios[i]['password'],'base64').toString('utf-8')}" >Editar</a>
                <a  class="button button-3d button-mini button-rounded delete" data-idx="${usuarios[i]['id']}" style="background-color: rgba(255, 0, 0, 0.514); color: white;">Borrar</a>`
            ])
        }
    }

    res.send(data)
}
exports.RegistrarU = async (req, res) =>{
    const nombre = req.body.nombre;
    const usuario = req.body.usuario;
    const roll = req.body.rol;
    const pass = Buffer.from(req.body.pass,'utf-8').toString('base64')
    const [row] = await conn.query("INSERT INTO usuarios(nombre,username,rol,password) VALUES (?,?,?,?)", [nombre, usuario, roll, pass])
    console.log("Inserta datos: ", row, row['affectedRows'])
    const status = row['affectedRows'] > 0

    res.send({
        status: status
    })
}
exports.ActualizarU = async (req, res) =>{
    const [row] = await conn.query("UPDATE usuarios SET nombre = ?, username = ?, rol = ?, password = ? WHERE id = ?", [nombre, usuario, roll, pass])
    const status = row['affectedRows'] > 0
    
    res.send({
        status: status
    })
}
exports.EliminarU = async (req, res) =>{
    const {action} = req.body
    if (action == 'delete') {
        const id = req.body.idux;
        const [row] = await conn.query("DELETE FROM usuarios WHERE id = ?", [id])
        const status = row['affectedRows'] > 0

        if(status) {
            res.send({
                'mensaje': 'Usuario Eliminado '
            })
        } else {
            res.send({
                'mensaje': 'Ocurrio un error al elimnar el usuario'
            })
        }
    }
}
/*Usuarios */









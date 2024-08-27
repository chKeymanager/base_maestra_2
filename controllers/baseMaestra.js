const pool = require('../config/db'); // Importa el pool de conexiones
const { query } = require('../models/baseMaestra'); // Importa la consulta

// Mapeo de códigos de área a descripciones
const areasMap = {
    'A000': 'Sin Area',
    'A010': 'Administración',
    'A020': 'Comercialización / ventas /Serv. A clientes',
    'A030': 'Compras',
    'A040': 'Distribución / Logística',
    'A050': 'Finanzas',
    'A060': 'Fiscal',
    'A070': 'General',
    'A080': 'Informatica Sistemas it/dp/ims',
    'A090': 'Legal',
    'A100': 'Mercadotecnia',
    'A110': 'Operaciones / Producción',
    'A120': 'Recursos Humanos / Capacitación'
};

// Mapeo de códigos de puestos a descripciones
const puestosMap = {
    'P000': 'Sin puesto',
    'P010': 'Presidencia / Dueño',
    'P020': 'Director',
    'P030': 'Gerente',
    'P040': 'Jefe',
    'P050': 'Empleado',
    'P060': 'Consultor',
    'P070': 'Catedrático',
    'P080': 'Empleado',
    'P090': 'Consejero',						
};

const basemaestra = (req, res) => {

    const sqlQuery = query(req)

    pool.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }

        const ds = [];

        for (const i in results){

            // Mapear los códigos a sus descripciones
            const puestoDescripcion = puestosMap[results[i].puesto] || results[i].puesto;
            const areaDescripcion = areasMap[results[i].area] || results[i].area;
            
            ds.push([
                results[i].numero_asociado = results[i].numero_asociado ? results[i].numero_asociado:"-",
                results[i].Nombre = results[i].Nombre ? results[i].Nombre:"-",
                results[i].A_Paterno = results[i].A_Paterno ? results[i].A_Paterno:"-",
                results[i].A_Materno = results[i].A_Materno ? results[i].A_Materno:"-",
                results[i].num_contacto = results[i].num_contacto ? results[i].num_contacto:"-",
                results[i].correo_contacto = results[i].correo_contacto ? results[i].correo_contacto:"-",
                puestoDescripcion,
                areaDescripcion,
                results[i].estado = results[i].estado ? results[i].estado:"-",
                results[i].num_telefono = results[i].num_telefono ? results[i].num_telefono:"-",
                results[i].titulo = results[i].titulo ? results[i].titulo:"-",
                results[i].region_nielsen = results[i].region_nielsen ? results[i].region_nielsen:"-",
                results[i].entidad_federativa = results[i].entidad_federativa ? results[i].entidad_federativa:"-",
                results[i].colonia = results[i].colonia ? results[i].colonia:"-",
                results[i].municipio = results[i].municipio ? results[i].municipio:"-",
                results[i].direccion = results[i].direccion ? results[i].direccion:"-",
                results[i].sector = results[i].sector ? results[i].sector:"-",
                results[i].giro = results[i].giro ? results[i].giro:"-",
                results[i].razon_social = results[i].razon_social ? results[i].razon_social:"-",
                results[i].ramo_industrial = results[i].ramo_industrial ? results[i].ramo_industrial:"-",
                results[i].nivel = results[i].nivel ? results[i].nivel:"-",
                results[i].industria = results[i].industria ? results[i].industria:"-",
                results[i].catalogo = results[i].catalogo ? results[i].catalogo:"-",
                results[i].codigo = results[i].codigo ? results[i].codigo:"-",
                results[i].lei = results[i].lei ? results[i].lei:"-",
                results[i].bk_contactoestatus = results[i].bk_contactoestatus  ? results[i].bk_contactoestatus:"-",
                results[i].tamano = results[i].tamano ? results[i].tamano:"-",
                results[i].estatus_mes = results[i].estatus_mes ? results[i].estatus_mes:"-"
            ]);
        }
        res.send(ds)
    });
}
module.exports = { basemaestra };
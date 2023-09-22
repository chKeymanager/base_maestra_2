const connection = require('../controllers/db');

const query = (req, res) => {
const page = req.query.page || 1; // Página actual (por defecto: 1)
const itemsPerPage = 300000; // Número de elementos por página
const offset = (page - 1) * itemsPerPage; // Calcular el índice de inicio

let sqlQuery = "SELECT * FROM base_maestra";

sqlQuery += ` LIMIT ${offset}, ${itemsPerPage}`;

console.log(sqlQuery);

// Ejemplo de consulta a la base de datos utilizando la conexión directa
connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
    console.error('Error al realizar la consulta:', error);
    return;
    }

const ds = []
for (const i in results){
    
    ds.push([
        results[i].numero_asociado,
        results[i].Nombre,
        results[i].A_Paterno,
        results[i].A_Materno,
        results[i].num_contacto,
        results[i].correo_contacto,
        results[i].puesto,
        results[i].area,
        results[i].estado,
        results[i].num_telefono,
        results[i].titulo,
        results[i].region_nielsen,
        results[i].entidad_federativa,
        results[i].colonia,
        results[i].municipio,
        results[i].direccion,
        results[i].sector,
        results[i].giro,
        results[i].razon_social,
        results[i].ramo_industrial,
        results[i].nivel,
        results[i].moda,
        results[i].salud,
        results[i].alimentos,
        results[i].financiero,
        results[i].retail,
        results[i].fabricante,
        results[i].cadena,
        results[i].catalogo,
        results[i].estandar,
        results[i].lei,
        results[i].bk_contactostatus,
        results[i].segmento,
        results[i].tamanio,
        results[i].estatus_mes
    ]);
}

    res.send(ds)
    // Procesa los resultados de la consulta aquí
    console.log('Resultados de la consulta:', ds);
});
};

  module.exports = { query };
const connection = require('../controllers/db');

const query = async (req, res) => {
const page = req.query.page || 1; // Página actual (por defecto: 1)
const itemsPerPage = 100; // Número de elementos por página
const offset = (page - 1) * itemsPerPage; // Calcular el índice de inicio

let sqlQuery = "SELECT * FROM base_maestra";

sqlQuery += ` LIMIT ${offset}, ${itemsPerPage}`;

console.log(sqlQuery);

const ds = []
const [row] = await connection.query(sqlQuery)

for (const i in row){
    
    ds.push([
        row[i].numero_asociado,
        row[i].Nombre,
        row[i].A_Paterno,
        row[i].A_Materno,
        row[i].num_contacto,
        row[i].correo_contacto,
        row[i].puesto,
        row[i].area,
        row[i].estado,
        row[i].num_telefono,
        row[i].titulo,
        row[i].region_nielsen,
        row[i].entidad_federativa,
        row[i].colonia,
        row[i].municipio,
        row[i].direccion,
        row[i].sector,
        row[i].giro,
        row[i].razon_social,
        row[i].ramo_industrial,
        row[i].nivel,
        row[i].moda,
        row[i].salud,
        row[i].alimentos,
        row[i].financiero,
        row[i].retail,
        row[i].fabricante,
        row[i].cadena,
        row[i].catalogo,
        row[i].estandar,
        row[i].lei,
        row[i].bk_contactostatus,
        row[i].segmento,
        row[i].tamanio,
        row[i].estatus_mes
    ]);
}
res.send(ds)
console.log(ds)

}
module.exports = { query };
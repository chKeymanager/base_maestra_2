const pool = require('../config/db'); // Importa el pool de conexiones
const { query_c } = require('../models/conteo'); // Importa la consulta


const basemaestra_c = (req, res) => {

    const sqlQuery = query_c(req)

    pool.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(500).send('Error en la consulta a la base de datos');
            return;
        }

        const ds = [];

        for (const i in results){

            ds.push([
                results[i].total
            ]);
        }
        res.send(ds)
    });
}
module.exports = { basemaestra_c };
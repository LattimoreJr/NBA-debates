const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/who_is_better');


module.exports = client
   

const {Pool} = require('pg');

 const pool = new Pool({
  type: "postgres",
  user: 'postgres',
  password: "",
  database: "test-1",
  host:"localhost",
  port: 5432,

});

module.exports = pool;
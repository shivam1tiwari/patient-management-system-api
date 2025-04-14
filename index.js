const express = require('express');
const app = express();
const pool = require('./db.js');
const doctorRouter = require('./controller/doctors.js');
const patientRouter = require('./controller/patients.js');
const visitRouter = require('./controller/visits.js');
const prescriptionRouter = require('./controller/prescriptions.js');
const doctorSchema = require('./schema/doctors.js');
const patientSchema = require('./schema/patients.js');
const visitSchema = require('./schema/visits.js');
const prescriptionsSchema = require('./schema/prescriptions.js');

const createSchema = async() => {
  try{
       await pool.connect();
      try{
        await pool.query(doctorSchema);
        await pool.query(patientSchema);
        await pool.query(visitSchema);
        await pool.query(prescriptionsSchema);
        console.log("schema created successfull")
      }catch(err){
        console.log("schema creation fail", err);
      } 
       app.listen(4010, (err)=>{
        if(err){
         console.log('not connected')
        }else{
         console.log("connected at 4010")
        }
       });
  }catch{
   console.log("Database not connected")
}
}
createSchema();
app.use(express.json());
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/visits', visitRouter);
app.use('/cure', prescriptionRouter);


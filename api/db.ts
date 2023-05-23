import knex from "knex";
import dotenv from 'dotenv'

let host, port, user, pass, database; 

dotenv.config()
process.env.NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : ""
console.log("Environment type FROM DB")
console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV === "dev") {
  host= process.env.DB_HOST
  port= parseInt(process.env.DB_PORT ? process.env.DB_PORT : "3306")
  user= process.env.DB_USERNAME
  pass= process.env.DB_PASS
  database= process.env.DB_NAME
} else if(process.env.NODE_ENV === "production") {
  host = process.env.RDS_HOST
  port= parseInt(process.env.DB_PORT ? process.env.DB_PORT : "3306")
  user = process.env.RDS_USER_MASTER
  pass = process.env.RDS_PASS_MASTER
  database = process.env.RDS_DB_NAME
}


let db = knex({
  client:'mysql', 
  connection: {
    host : host,
    port : port,
    user : user,
    password : pass,
    database : database
}})


export  {db};
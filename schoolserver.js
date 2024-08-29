import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import bcrypt, { compare } from 'bcrypt';
import register from "./servercomponent/register.js";
import signin from './servercomponent/signin.js';
import total from './servercomponent/totalSchool.js';
import department from './servercomponent/departmentNumber.js';



const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'silva633966',
      database: 'school'
    },
  });



const app = express();
const saltRounds = 10;
app.use(bodyparser.json());
app.use(cors());


app.post('/signin',(res,req)=>{signin(res,req,db,bcrypt)})

app.post('/register',(res,req)=>{register(res,req,bcrypt,db,saltRounds)})

app.get('/total',(res,req)=>{total(res,req,db)});


app.post('/department',(req,res)=>{department(req,res,db)})


app.post('/departmentMale',(req,res)=>{
  const{department}=req.body;
db('users').where('department',department)
.sum('entries').where('sex','male')
.returning('sum')
.then(sum =>{if(sum.length)
 {console.log(sum[0])
   res.status(200).json(sum[0].sum)
  
 }else{
      res.status(400).json('Not Found')
 }
})
})
app.post('/departmentFemale',(req,res)=>{
  const{department}=req.body;
  console.log(department)
db('users').where('department',department)
.sum('entries').where('sex','female')
.returning('sum')
.then(sum =>{if(sum.length)
 {console.log(sum[0])
   res.status(200).json(sum[0].sum)
  
 }else{
      res.status(400).json('Not Found')
 }
})
})
app.post('/search',(req,res)=>{
  const{search} = req.body;
  if (!search) {
    return res.status(400).json([])
  }
  db('users').whereLike('othername',`%${search}%`)
  .orWhereLike('surname',`%${search}%`)
.then(ss => {if (ss.length) {
  console.log(ss)
    return res.status(200).json(ss)

  }else{
    res.status(404).json([])
  }
  
  })
})



app.listen(3012,()=>{
    console.log('working on 3012')
})


const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors')
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://shawoncse954:iJpJvqGyEa2kWyQr@cluster0.bcaen6z.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run(){
  
   try{
         await client.connect();
         
         const database = client.db('User');
         const userdata = database.collection('UserInfo');
         const UserDetails = database.collection("UserData");
          
           const userData = [];

          app.get('/UserInfo',async(req,res)=>{
            const readdata = userdata.find({});
            const quraydata =await readdata.toArray();
            console.log(quraydata);
            res.send(quraydata);
            return res.json(quraydata);
          });

         const doc={
            email:'shawoncsr954@gmail.com',
            name:'shawon',
            num:"01775389319",
         }

         const result = await userdata.insertOne(doc);


         app.post('/UserData',async(req,res)=>{
           const readdata = req.body;

           const udata={
            "id":userData.length+1,
            "name":req.body.name,
            "email":req.body.email,
            "num":req.body.num,

           }

           userData.push(udata);
           console.log("UserData",udata);
           res.status(201).send(
           {
            "status_code":201,
            "massage":"UserInfo Successfully",
            "user":udata,
           }
           )
res.json(udata);
             const result = await UserDetails.insertOne(udata);
             console.log("data save",result);

         });


   console.log('Data Successful');
   }
   finally{}


  }

  run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Running Server')
});

app.listen(port);
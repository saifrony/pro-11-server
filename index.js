const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Port = process.env.PORT || 5000;

// middlware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://visa:Uyhv7q8H9rKXp78S@cust1.baig3hx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run (){
    try{
        const visaCollection =client.db('visaServer').collection('services');
       app.get('/service', async(req,res)=>{
        const query ={}
        const cursor = visaCollection.find(query)
        const services = await cursor.skip(3).toArray()
        res.send(services)
       })

       app.get('/services', async(req,res)=>{
        const query ={}
        const cursor = visaCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
       })
    }
    finally{

    }
}
run().catch(err=>console.log(err));



app.get('/', (req, res)=>{
    res.send('node is running');
});

app.listen(Port,()=>{
    console.log(`server is running on ${Port}`);
})
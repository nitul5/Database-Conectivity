// First we have install the mongodb module by using npm i mongodb 
const fs = require('fs');
const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient; 
app.use(express.urlencoded({extended:true})); //Application level middleware

//Defining the Database: 
let database;
let collection;
let MyDatabase =  async()=>{
    let connection = await mongodb.connect('mongodb://0.0.0.0:27017/');
    database = await connection.db('LoginData');
    collection = await database.createCollection('LoginDetails');
}
MyDatabase();

// sending the login page: Note: Create your own form page with internal css!
app.get('/login', async (req, res)=>{
   res.writeHead(200, {"content-type":"text/html"});
   let read = fs.createReadStream('./components/login.html');
   read.pipe(res);
});

//Posting data to the respective database's collection!
let datas;
app.post('/login', async (req,res)=>{
     datas = await req.body;
    let insert = await collection.insertOne(datas);
     //storing form data to a local file!
    let LoginData = `{_id:${datas._id} username: ${datas.username}, password: ${datas.password}}\n`;
    fs.appendFile('./loginDetails.txt', JSON.stringify(LoginData), err=>{if(err) throw err;})
    res.send('Submitted');
});
 

//? displaying data in UI:
app.get('/get-users', async (req, res) => {
    try {
        let users = await collection.find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});

// defining the port: 
app.listen(5000, err=>{
    if(err) throw err;
    console.log("Hello EXpress");
});

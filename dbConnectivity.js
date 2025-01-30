// NOTE: This code is for them, those whose systems can't able to connect with localhost/27017.

// step1: First download 'mongodb' module using command 'npm install mongodb' in the terminal.
// step2: Then, import the downloaded module, example const mongodb = require('mongodb');
// step3: follow the following code --> 
const mongodb = require('mongodb').MongoClient; // Use destructuring for cleaner import --> const {MongoClient}=require('mongodb');
// We are performing the asynchronous task here, so that both server and database can perform operations together without blocking each other's tasks.
const connectDb = async () => {
        // Connect to the MongoDB server
        const connection = await mongodb.connect('mongodb://0.0.0.0:27017/');
        console.log("Database Connected");
        // Creating the database
        const database = connection.db('webDevelopment'); // if you want, you can use await keyword --> await connection.db('Database Name');
        console.log("Database created: 'webDevelopment'");
        // Creating Collection: 
        let collection = await database.createCollection('Mern_Stack');
        console.log('Collection created');
};
connectDb(); // calling the async function!

//? this is just simple way to create server, Create the simple one first before designing the difficult one!

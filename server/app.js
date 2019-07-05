const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
mongoose.set('debug', true);

// connect to mlab database
// make sure to replace my db string & creds with your own
// mongoose.connect('mongodb+srv://root:root@cluster0-k9fwo.mongodb.net/test?retryWrites=true&w=majority')
// mongoose.connection.once('open', () => {
//     console.log('conneted to database');
// });
// var MongoClient = require('mongodb').MongoClient;

// Connect to the db
// MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, client) {
   
//      if(err) throw err;

//      else {
//          console.log("Database Connected")
//      }

//      //Write databse Insert/Update/Query code here..
//      var db = client.db('imagedb');

//      db.collection('imagedb', function (err, collection) {
        
//         console.log(collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' }));     
//      })           
// });

mongoose.connect('mongodb://localhost:27017/imagedb' , {useNewUrlParser : true} , (err) => {
    if(!err) {console.log("MongoDb Connected")}
    else {console.log(err)}
})
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});

//create express app
const exp = require("express");
const app = exp();
const mclient=require("mongodb").MongoClient;
const path=require('path');
const cors=require('cors')
app.use(cors())

const userApp = require('./APIS/userApi')
const doctorApp = require('./APIS/doctorApi')
// const productApp = require('./APIS/productApi')
//connect build with nodejs
app.use(exp.static(path.join(__dirname,'./build')))

//DB connection URL
const DBurl="mongodb+srv://mahadhyut:mahadhyut@mahadhyut.ypziejz.mongodb.net/?retryWrites=true&w=majority"
    
//connect with mongoDB server
mclient.connect(DBurl)
.then((client)=>{

  //get DB object
  let dbObj=client.db("pneumonia");

  //create collection objects
  let userCollectionObject = dbObj.collection("usercollection")
  let doctorCollectionObject = dbObj.collection("doctorcollection")

  //sharing collection objects to APIs
  app.set("userCollectionObject", userCollectionObject);
  app.set("doctorCollectionObject", doctorCollectionObject);
  
  console.log("DB connection success")
})
.catch(err=>console.log('Error in DB connection ',err))

//import userApp and studentApp


//excute specific middleware based on path
app.use("/user-api", userApp);
app.use("/doctor-api", doctorApp);

//dealing with page refresh
app.use('*', (request, response)=>{
  response.send("<h1>This backend belongs to MAHADHYUT!</h1>")
})

//handling invalid paths
app.use((request, response, next) => {
  response.send({ message: `path ${request.url} is invalid` });
});

//error handling middleware
app.use((error, request, response, next) => {
  response.send({ message: "Error occurred", reason: `${error.message}` });
});

//assign port number
app.listen(3000, () => console.log("server listening on port 3000.."));

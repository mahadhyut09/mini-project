//create router to handle doctor api reqs
const exp = require("express");
const doctorApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
// //import bcryptjs for password hashing
// const bcryptjs = require("bcryptjs");
// //import jsonwebtoken to create token
// const jwt=require("jsonwebtoken")

//to extract body of request object
doctorApp.use(exp.json());

//create a route to 'create-doctor'
doctorApp.post(
  "/create-doctor",
  expressAsyncHandler(async (request, response) => {
    //get doctorCollectionObject
    let doctorCollectionObject = request.app.get("doctorCollectionObject");
    //get doctorObj from client
    let newDoctorObj = request.body;
    //seacrh for doctor by doctornumber
    let doctorOfDB = await doctorCollectionObject.insertOne(newDoctorObj);

    response.send({"message": "Added"})
  })
);

//create a route to 'create-doctor'
doctorApp.get(
  "/get-nearby-doctors",
  expressAsyncHandler(async (request, response) => {
    //get doctorCollectionObject
    let doctorCollectionObject = request.app.get("doctorCollectionObject");
    let body = request.body
    let doctorsOfDB = await doctorCollectionObject.aggregate([
      { $project: {
          _id: 0,
          name: 1, 
          designation: 1, 
          hospital: 1, 
          location: 1,
          latitude: 1,
          longitude: 1,
          distance: { $add: [ { $pow: [ { $subtract: [ "$latitude", body.latitude ] }, 2 ] }, { $pow: [ { $subtract: [ "$longitude", body.longitude ] }, 2 ] } ] }
        }},
      { $sort: { distance: 1 } },
      { $limit: 1 },
      { $project: { name: 1, designation: 1, hospital: 1, location: 1, latitude: 1, longitude: 1 } }
    ]).toArray()

    response.send({"message": doctorsOfDB})
  })
);

module.exports = doctorApp;
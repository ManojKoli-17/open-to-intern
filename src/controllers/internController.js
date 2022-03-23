const InternModel = require("../models/internModel");
const CollegeModel = require("../models/collegeModel");

const validator = require("validator");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidReqBody = function (data) {
  return Object.keys(data).length > 0;
};


let createIntern = async function (req, res) {
  try {
    let data = req.body;

    if (!isValidReqBody(data)) {
      res.status(400).send({ status: false, msg: "Please provide intern  details" })
      return
  }

  if (!isValid(data.name)) {
    res.status(400).send({ status: false, msg: "Name is required" })
    return
}

if (!isValid(data.email)) {
  res.status(400).send({ status: false, msg: "Email is required" })
  return
}

if (!isValid(data.mobile)) {
  res.status(400).send({ status: false, msg: "Mobile no. is required" })
  return
}

if (!isValid(data.collegeId)) {
  res.status(400).send({ status: false, message: "CollegeId is required" })
  return
}

if (!(validator.isEmail(data.email))) {
  return res.status(400).send({ status: false, msg: "Plz enter valid email" })
}

if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.mobile))) {
  res.status(400).send({ status: false, msg: "Plz enter valid mobile number" })
  return
}

let isEmailPresent = await InternModel.findOne({email:data.email})
if(isEmailPresent){
return   res.status(400).send({status:false,msg:"Email is already exist"})
}

let isMobilePresent = await InternModel.findOne({mobile:data.mobile})
if(isMobilePresent){
return  res.status(400).send({status:false,msg:"Mobile no. is already exist"})
}


const collegeId = await CollegeModel.findOne({ _id: data.collegeId })
if (!collegeId) {
    return res.status(400).send({ status: false, msg: "No such college found" })
}

    let InternCreated = await InternModel.create(data);
    res.status(201).send({ status: true, data: InternCreated});

  } catch (err) {
    res.status(500).send({ status:false, msg: err.message });
  }
};



module.exports={createIntern }


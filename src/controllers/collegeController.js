const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
const isValidReqBody = function (data) {
  return Object.keys(data).length > 0;
};

const createCollege = async function (req, res) {
  try {
    let data = req.body;

    //request body validations

    if (!isValidReqBody(data)) {
      res
        .status(400)
        .send({ status: false, msg: "Please provide college details" });
      return;
    }

    if (!isValid(data.name)) {
      res.status(400).send({ status: false, msg: "Name is required" });
      return;
    }

    if (!isValid(data.fullName)) {
      res.status(400).send({ status: false, msg: "Full name is required" });
      return;
    }

    if (!isValid(data.logoLink)) {
      res.status(400).send({ status: false, msg: "logoLink is required" });
      return;
    }

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(data.logoLink)) {
      res.status(400).send({ status: false, msg: "Plz enter valid logo link" });
      return;
    }

    //Clg name and clg full name validation
    let clgName = await CollegeModel.findOne({ name: data.name });
    if (clgName) {
      return res
        .status(400)
        .send({ status: false, msg: "Name is already exist" });
    }

    let clgFullName = await CollegeModel.findOne({ fullName: data.fullName });
    if (clgFullName) {
      return res
        .status(400)
        .send({ status: false, msg: "FullName is already exist" });
    }
    let CollegeCreated = await CollegeModel.create(data);
    res.status(201).send({ status: true, data: CollegeCreated });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const getCollege = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;

    let collegeDetails = await CollegeModel.findOne({name: collegeName, isDeleted: false}).select({ _id: 1, name: 1, fullName: 1, logoLink: 1 });

    if (!collegeName) {
      res.status(400).send({ status: false, msg: "plz provide college name" });
    }

    if (!collegeDetails) {
      res.status(404).send({ status: false, msg: "college details not found" });
    }

    let clgId = collegeDetails._id;
    let InternDetails = await InternModel.find({collegeId: clgId, isDeleted: false}).select({ _id: 1, name: 1, email: 1, mobile: 1 });

    if (InternDetails.length > 0) {
      collegeData = {
        name: collegeDetails.name,
        fullName: collegeDetails.fullName,
        logoLink: collegeDetails.logoLink,
        interest: InternDetails,
      };
      return res.status(200).send({ status: true, data: collegeData });
    } else {
      // res.status(404).send({status: false, msg:"Interns not found"});
      return res.status(404).send({status: true, data: {...collegeDetails.toObject(),interests: "Interns not found"}});
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createCollege, getCollege };

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// Getting Module

const Class_Model = require("../models/Class");
const ClassSubject_Model = require("../models/ClassSubject");
const ClassLevel_Model = require("../models/ClassLevel");
const Teacher_Model = require("../models/Teacher");
const Observer_Model = require("../models/Observer");
const Form_Model = require("../models/Form");

router.get("/test", (req, res) => {
  res.send("Working");
});

//
//

router.post("/addclasslist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new Class_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Class Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/editclasslist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await Class_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getclasslist", async (req, res) => {
  try {
    const allClasses = await Class_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteclasslist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Class_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

//
//

router.post("/addclasssubject", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new ClassSubject_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Class Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/editclasssubject", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await ClassSubject_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getclasssubject", async (req, res) => {
  try {
    const allClasses = await ClassSubject_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});
router.delete("/deleteclasssubject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ClassSubject_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

//
//

router.post("/addclasslevel", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new ClassLevel_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/editclasslevel", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await ClassLevel_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getclasslevel", async (req, res) => {
  try {
    const allClasses = await ClassLevel_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteclasslevel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ClassLevel_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

// /////////////////////
// TEACHERS
// /////////////////////

router.post("/addteacherlist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new Teacher_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/editteacherlist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await Teacher_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getteacherlist", async (req, res) => {
  try {
    const allClasses = await Teacher_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteteacher/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Teacher_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

// ////////////////////
// OBSERVSERS
// ////////////////////

router.post("/addobserver", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new Observer_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Observer Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/editobserver", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await Observer_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "Observer Updated" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getobserver", async (req, res) => {
  try {
    const allClasses = await Observer_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteobserver/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Observer_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

// //////////////////
// FORMS
// ///////////////////
router.post("/saveform", async (req, res) => {
  let fieldData = req.body;
  try {
    const newClass = new Form_Model(fieldData);
    await newClass.save();
    res.status(201).json({ message: "New Form Created" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
  }
});

router.get("/getforms/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allClasses = await Form_Model.find({ observerId: id });
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});
router.get("/getformpreview/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allClasses = await Form_Model.find({ _id: id });
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteform/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Form_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
  }
});

module.exports = router;
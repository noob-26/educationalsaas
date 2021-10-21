const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
// Getting Module

const Class_Model = require("../models/Class");
const ClassSubject_Model = require("../models/ClassSubject");
const ClassLevel_Model = require("../models/ClassLevel");
const Teacher_Model = require("../models/Teacher");
const TeacherYear_Model = require("../models/TeacherYear");
const Observer_Model = require("../models/Observer");
const Form_Model = require("../models/Form");
const Training_Model = require("../models/Training");
const FormResponse_Model = require("../models/FormResponses");
// const { findById } = require("../models/Class");

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
    const prevClass = await Class_Model.find({ name: formData.class });
    prevClass[0].numberOfSubjects = prevClass[0].numberOfSubjects + 1;
    await Class_Model.findByIdAndUpdate(
      { _id: prevClass[0]._id },
      prevClass[0],
      {
        useFindAndModify: false,
      }
    );
    res.status(201).json({ message: "New Class Created" });
  } catch (error) {
    console.log(error);
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
    const prevSubject = await ClassSubject_Model.findById(id);
    const prevClass = await Class_Model.find({ name: prevSubject.class });
    prevClass[0].numberOfSubjects = prevClass[0].numberOfSubjects - 1;
    await Class_Model.findByIdAndUpdate(
      { _id: prevClass[0]._id },
      prevClass[0],
      {
        useFindAndModify: false,
      }
    );
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
    const year = await TeacherYear_Model.find({
      yearOfJoining: formData.yearOfJoining,
    });

    if (year.length === 0) {
      const newYear = new TeacherYear_Model({
        yearOfJoining: formData.yearOfJoining,
      });
      await newYear.save();
    } else {
      console.log(year[0].total);
      await TeacherYear_Model.findByIdAndUpdate({ _id: year[0]._id }, year[0], {
        useFindAndModify: false,
      });
    }

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
router.get("/getteacheryears", async (req, res) => {
  try {
    const allClasses = await TeacherYear_Model.find();
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deleteteacher/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher_Model.findById(id);

    await Teacher_Model.findByIdAndDelete(id);

    const year = await TeacherYear_Model.find({
      yearOfJoining: teacher.yearOfJoining,
    });

    year[0].total = year[0].total - 1;
    await TeacherYear_Model.findByIdAndUpdate({ _id: year[0]._id }, year[0], {
      useFindAndModify: false,
    });

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
router.get("/getallforms", async (req, res) => {
  const { id } = req.params;
  try {
    const allClasses = await Form_Model.find();
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
router.get("/getformresponses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allClasses = await FormResponse_Model.find({ formId: id });
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});
router.get("/getallresponses", async (req, res) => {
  try {
    const allClasses = await FormResponse_Model.find();
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.post("/submitform", async (req, res) => {
  const formData = req.body;
  console.log(formData);
  try {
    const newResponse = new FormResponse_Model(formData);
    const form = await Form_Model.find({ _id: formData.formId });
    form[0].noOfResponses = form[0].noOfResponses + 1;
    await Form_Model.findByIdAndUpdate({ _id: form[0]._id }, form[0], {
      useFindAndModify: false,
    });
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

router.delete("/deleteform/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Form_Model.findByIdAndDelete(id);
    const allForms = await FormResponse_Model.find({ formId: id });
    allForms.map(
      async (form) => await FormResponse_Model.findByIdAndDelete(form._id)
    );
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
  }
});

// ////////////////////////////
// TRAINING
// ///////////////////////////
router.post("/addtraininglist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = new Training_Model(formData);
    await newClass.save();
    res.status(201).json({ message: "New Class Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.patch("/edittraininglist", async (req, res) => {
  let formData = req.body;
  try {
    const newClass = await Training_Model.findByIdAndUpdate(
      { _id: formData._id },
      formData,
      { useFindAndModify: false }
    );
    res.status(201).json({ message: "New Level Created" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.get("/gettraininglist", async (req, res) => {
  try {
    const allClasses = await Training_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});
router.get("/gettraininglist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allClasses = await Training_Model.find({ _id: id });
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.delete("/deletetraininglist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Training_Model.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

// ////////////////////////////
// TRAINING Teacher
// ///////////////////////////
router.post("/addtrainingteacher/:id", async (req, res) => {
  const { id } = req.params;
  let formData = req.body;
  try {
    const newClass = await Training_Model.find({ _id: id });
    newClass[0].teachers.push(formData);
    const newTraining = await Training_Model.findByIdAndUpdate(
      id,
      newClass[0],
      {
        new: true,
        useFindAndModify: false,
      }
    );
    console.log(newTraining);
    res.status(201).json({ message: "New Teacher Added" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error" });
  }
});

// router.patch("/edittrainingteacher", async (req, res) => {
//   let formData = req.body;
//   try {
//     const newClass = await Training_Model.findByIdAndUpdate(
//       { _id: formData._id },
//       formData,
//       { useFindAndModify: false }
//     );
//     res.status(201).json({ message: "New Level Created" });
//   } catch (error) {
//     res.status(404).json({ message: "Error" });
//   }
// });

router.get("/gettrainingteacher", async (req, res) => {
  try {
    const allClasses = await Training_Model.find({});
    res.status(201).json(allClasses);
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

router.post("/deletetrainingteacher/:id", async (req, res) => {
  const { id } = req.params;
  let formData = req.body;
  try {
    const newClass = await Training_Model.find({ _id: id });
    newClass[0].teachers = newClass[0].teachers.filter((t) => t != formData);
    const newTraining = await Training_Model.findByIdAndUpdate(
      id,
      newClass[0],
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({ message: "Deleted" });
  } catch (error) {
    res.status(404).json({ message: "Error" });
  }
});

module.exports = router;

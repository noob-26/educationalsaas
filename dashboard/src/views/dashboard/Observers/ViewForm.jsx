import React, { useState, useEffect } from "react";
import { useGeneratedForm } from "react-form-dynamic";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";

let forms = [];

const ViewForm = () => {
  const { id } = useParams();

  //   let [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_SERVICE}/getformpreview/${id}`)
      .then((res) => {
        setLoading(false);
        // setFields(res.data[0].fields)
        forms = res.data[0].fields;
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const [formElements, formik] = useGeneratedForm(forms, handleSubmit);

  return (
    <div style={{ padding: "30px" }}>
      {!loading ? (
        <form onSubmit={handleSubmit}>{formElements}</form>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default ViewForm;

import React, { useState, useEffect } from "react";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

const ViewForm = () => {
  const { id } = useParams();

  let [fields, setFields] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/getformpreview/${id}`)
      .then((res) => {
        setFields(res.data[0].fields);
        setTitle(res.data[0].title);
      })
      .catch((err) => console.log(err));
  }, []);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [title, setTitle] = useState("");

  const submitForm = async () => {
    const data = [];
    fields.map((f) =>
      data.push({
        question: f.label,
        response: f.type === "CheckBox" ? f.selected.join(", ") : f.value,
      })
    );
    const formData = { formId: id, data };
    console.log(formData);
    await axios
      .post(`${API_SERVICE}/submitform`, formData)
      .then((res) => {
        setHasSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  if (hasSubmitted)
    return (
      <Container maxWidth="sm" sx={{ mt: 3, textAlign: "center" }}>
        <h1>Form Submitted. Thank You!!</h1>
        <h3
          style={{ color: "blue", marginTop: "10px", cursor: "pointer" }}
          onClick={() => setHasSubmitted(false)}
        >
          Submit Another Response
        </h3>
      </Container>
    );

  console.log(fields);

  return (
    <div style={{ padding: "30px" }}>
      <Container maxWidth="sm">
        <center>
          <h2>{title}</h2>
        </center>
        <hr style={{ marginBottom: "20px" }} />
        {fields?.length > 0 &&
          fields?.map((field) => (
            <>
              {field.optionType === 2 && (
                <FormControl fullWidth>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    sx={{ mb: 2 }}
                    value={field.value}
                    label={field.label}
                    onChange={(e) =>
                      setFields(
                        fields.map((el) =>
                          el.id === field.id
                            ? { ...el, value: e.target.value }
                            : el
                        )
                      )
                    }
                  >
                    {field.options.map((opt) => (
                      <MenuItem value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {field.optionType === 1 && (
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label={field.label}
                  type={field.type === "Password" && "password"}
                  onChange={(e) =>
                    setFields(
                      fields.map((el) =>
                        el.id === field.id
                          ? { ...el, value: e.target.value }
                          : el
                      )
                    )
                  }
                />
              )}
              {field.optionType === 4 && (
                <FormControl component="fieldset">
                  <FormLabel component="legend">{field.label}</FormLabel>
                  <RadioGroup
                    sx={{ ml: 3, mb: 2 }}
                    value={field.value}
                    onChange={(e) =>
                      setFields(
                        fields.map((el) =>
                          el.id === field.id
                            ? { ...el, value: e.target.value }
                            : el
                        )
                      )
                    }
                  >
                    {field.options.map((opt) => (
                      <FormControlLabel
                        value={opt}
                        control={<Radio />}
                        label={opt}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {field.optionType === 3 && (
                <>
                  <Typography>{field.label}</Typography>
                  <FormGroup fullWidth sx={{ ml: 3, mb: 2 }}>
                    {field.options.map((opt) => (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={opt}
                        onChange={(e) =>
                          setFields(
                            fields.map((el) =>
                              el.id === field.id
                                ? e.target.checked
                                  ? { ...el, selected: [...el.selected, opt] }
                                  : {
                                      ...el,
                                      selected: el.selected.filter(
                                        (f) => f !== opt
                                      ),
                                    }
                                : el
                            )
                          )
                        }
                      />
                    ))}
                  </FormGroup>
                </>
              )}
            </>
          ))}

        <center>
          <Button
            variant="contained"
            onClick={submitForm}
            fullWidth
            size="large"
          >
            Submit
          </Button>
        </center>
      </Container>
    </div>
  );
};

export default ViewForm;

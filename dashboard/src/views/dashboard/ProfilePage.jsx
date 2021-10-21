import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Dropzone from "react-dropzone";
import { v4 as uuid4 } from "uuid";

import { auth, storage } from "../../Firebase/index";
import axios from "axios";
import { API_SERVICE } from "config";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    userRole: "",
    userEmail: "",
    userName: "",
    userInstitute: "",
  });
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser(user);
    }
  });

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    await axios
      .get(`${API_SERVICE}/getuser/${user.uid}`)
      .then((res) => {
        setFormData(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const updateDetails = async () => {
    await axios
      .post(`${API_SERVICE}/updateuser/${user.uid}`, formData)
      .then((res) => {
        getUser();
        setMessage("Updated!!");
        handleClickSnack();
      })
      .catch((err) => console.log(err));
  };

  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const handleClickSnack = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {
    if (file.length > 0) {
      onSubmit();
    }
  }, [file]);

  const handleDrop = async (acceptedFiles) => {
    setFile(acceptedFiles.map((file) => file));
  };

  const onSubmit = () => {
    if (file.length > 0) {
      file.forEach((file) => {
        const timeStamp = Date.now();
        var uniquetwoKey = uuid4();
        uniquetwoKey = uniquetwoKey + timeStamp;
        const uploadTask = storage
          .ref(`pictures/products/${uniquetwoKey}/${file.name}`)
          .put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            handleClickSnack();
            setMessage(`Uploading ${progress} %`);
          },
          (error) => {
            setMessage(error);
            handleClickSnack();
          },
          async () => {
            // When the Storage gets Completed
            const fp = await uploadTask.snapshot.ref.getDownloadURL();
            // setFilePath(fp);
            // setFormData({ ...formData, filePath: fp });
            var user = auth.currentUser;
            user
              .updateProfile({ photoURL: fp })
              .then((res) => {
                handleClickSnack();
                setMessage("File Uploaded");
                window.location.reload();
              })
              .catch((res) => console.log(res));

            // handleClickSnack();
            // setMessage("File Uploaded");
            // // window.location.reload();
          }
        );
      });
    } else {
      setMessage("No File Selected Yet");
      handleClickSnack();
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnack}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnack}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Grid sx={{ display: "flex" }}>
        <Grid
          md="4"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              user?.photoURL ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Farchive.org%2Fdownload%2Ftwitter-default-pfp%2Fe.png&f=1&nofb=1"
            }
            style={{
              width: "130px",
              borderRadius: "50%",
              marginBottom: "20px",
            }}
          />
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <Button variant="contained">Upload Profile Photo</Button>
              </div>
            )}
          </Dropzone>
        </Grid>
        <Grid md="8">
          Email
          <TextField
            sx={{ mb: 2 }}
            // label="Email"
            disabled
            fullWidth
            value={formData?.userEmail}
          />
          Full Name
          <TextField
            sx={{ mb: 2 }}
            // label="Name"
            fullWidth
            value={formData?.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          />
          Institute Name
          <TextField
            sx={{ mb: 2 }}
            // label="Institute"
            fullWidth
            value={formData?.userInstitute}
            onChange={(e) =>
              setFormData({ ...formData, userInstitute: e.target.value })
            }
          />
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend">Select your role</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="row-radio-buttons-group"
              value={formData?.userRole}
              onChange={(e) =>
                setFormData({ ...formData, userRole: e.target.value })
              }
            >
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="Institute"
                control={<Radio />}
                label="Institute"
              />
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={updateDetails}>
              Update Details
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;

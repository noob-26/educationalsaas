import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// material-ui
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
// import { useNavigate } from "react-router";
import { auth } from "../../../../Firebase/index";

// project imports
import useScriptRef from "hooks/useScriptRef";
import Google from "assets/images/icons/social-google.svg";
import AnimateButton from "ui-component/extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import axios from "axios";
import { API_SERVICE } from "../../../../config";

// style constant
const useStyles = makeStyles((theme) => ({
  redButton: {
    fontSize: "1rem",
    fontWeight: 500,
    backgroundColor: theme.palette.grey[50],
    border: "1px solid",
    borderColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem",
    },
  },
  signDivider: {
    flexGrow: 1,
  },
  signText: {
    cursor: "unset",
    margin: theme.spacing(2),
    padding: "5px 56px",
    borderColor: `${theme.palette.grey[100]} !important`,
    color: `${theme.palette.grey[900]}!important`,
    fontWeight: 500,
  },
  loginIcon: {
    marginRight: "16px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "8px",
    },
  },
  loginInput: {
    ...theme.typography.customInput,
  },
  radioInput: {
    borderColor: `${theme.palette.grey[100]} !important`,
    color: `${theme.palette.grey[900]}!important`,
    marginTop: "18px",
    marginBottom: "18px",
  },
}));

//= ==========================|| FIREBASE - REGISTER ||===========================//

const FirebaseRegister = ({ ...others }) => {
  const classes = useStyles();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(true);

  const [strength, setStrength] = React.useState(0);
  const [level, setLevel] = React.useState("");

  const googleHandler = async () => {
    console.error("Register");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);

  const initialState = {
    email: "",
    password: "",
    fName: "",
    lName: "",
    institute: "",
    role: "",
  };
  const [formData, setFormData] = useState(initialState);
  //   const navigate = useNavigate();

  console.log(formData);

  const register = (event) => {
    auth
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then((result) => {
        var user = result.user;
        const name = `${formData.fName} ${formData.lName}`;
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userId", user.uid);
        user
          .updateProfile({
            displayName: `${formData.fName} ${formData.lName}`,
          })
          .then(async () => {
            const userData = {
              userId: user.uid,
              userName: name,
              userEmail: user.email,
              userRole: formData.role,
              userInstitute: formData.institute,
            };
            await axios
              .post(`${API_SERVICE}/adduser`, userData)
              .then((res) => {
                window.location.href = "/dashboard/default";
              })
              .catch((err) => console.log(err));
          });

        // navigate("/dashboard/default", { replace: true });
      })
      .catch(function (error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Typography variant="subtitle1">
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={matchDownSM ? 0 : 2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            name="fname"
            type="text"
            defaultValue="Joseph"
            className={classes.loginInput}
            value={formData.fName}
            onChange={(e) =>
              setFormData({ ...formData, fName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            name="lname"
            type="text"
            defaultValue="Doe"
            className={classes.loginInput}
            value={formData.lName}
            onChange={(e) =>
              setFormData({ ...formData, lName: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <FormControl fullWidth className={classes.loginInput}>
        <InputLabel htmlFor="outlined-adornment-email-register">
          Email Address
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
          type="email"
          name="email"
          inputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </FormControl>

      <FormControl className={classes.radioInput} component="fieldset">
        <FormLabel component="legend">Select your role</FormLabel>
        <RadioGroup
          row
          aria-label="role"
          name="row-radio-buttons-group"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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

      <FormControl fullWidth className={classes.loginInput}>
        <InputLabel htmlFor="outlined-adornment-email-register">
          Institute
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
          name="institute"
          inputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          value={formData.institute}
          onChange={(e) =>
            setFormData({ ...formData, institute: e.target.value })
          }
        />
      </FormControl>

      <FormControl fullWidth className={classes.loginInput}>
        <InputLabel htmlFor="outlined-adornment-password-register">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </FormControl>

      {strength !== 0 && (
        <FormControl fullWidth>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box
                  backgroundColor={level.color}
                  sx={{
                    width: 85,
                    height: 8,
                    borderRadius: "7px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" fontSize="0.75rem">
                  {level.label}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      )}

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label={
              <Typography variant="subtitle1">
                Agree with &nbsp;
                <Typography variant="subtitle1" component={Link} to="#">
                  Terms & Condition.
                </Typography>
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={register}
          >
            Sign up
          </Button>
        </AnimateButton>
      </Box>

      <Grid item xs={12}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Divider className={classes.signDivider} orientation="horizontal" />
          <AnimateButton>
            <Button
              variant="outlined"
              className={classes.signText}
              sx={{ borderRadius: `${customization.borderRadius}px` }}
              disableRipple
              disabled
            >
              OR
            </Button>
          </AnimateButton>
          <Divider className={classes.signDivider} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            className={classes.redButton}
            onClick={googleHandler}
            size="large"
            variant="contained"
          >
            <img
              src={Google}
              alt="google"
              width="20px"
              sx={{ mr: { xs: 1, sm: 2 } }}
              className={classes.loginIcon}
            />{" "}
            Sign up with Google
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            className={classes.redButton}
            onClick={googleHandler}
            size="large"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            <img
              src="https://img.icons8.com/fluency/50/000000/facebook-new.png"
              alt="facebook"
              width="20px"
              className={classes.loginIcon}
            />
            Sign up with Facebook
          </Button>
        </AnimateButton>
      </Grid>
    </>
  );
};

export default FirebaseRegister;

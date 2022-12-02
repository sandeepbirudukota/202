import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import MyToast from '../components/MyToast'

// import AlertModal from "../common/Alert";

const theme = createTheme();

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGSignIn, setGSignIn] = useState(false);
  const [isPopUp, setPopUp] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')
  const navigate = useNavigate();


  const validEmail = (email) => {
    const regexEmail = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/

    return regexEmail.test(email)
  }

  useEffect(() => {
    console.log(localStorage.getItem('isAuth'))
    if (localStorage.getItem('isAuth') === false) {

      setPopUp(true);
      showPopUp('Pls verify your account or give right credentials!');
    }
    // console.log(localStorage.getItem('isAuth'))
    //   showPopUp('Pls verify your email address first')
  }, [])


  const onDefaultSignIn = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setShowToast(true)
      setToastText('Please enter both fields')
    }
    else if (!validEmail(email)) {
      setShowToast(true)
      setToastText('Please enter email correctly')
    }
    else {
      axios.get(`/auth/get?email=${email}&password=${password}`)
        .then(async (res) => {
          console.log("success", res);
          localStorage.setItem("email", JSON.stringify(email));
          if (res.status == 200) {
            if (res) {
              localStorage.setItem("name", res?.data?.user?.foundUser?.username);
              localStorage.setItem("email", res?.data?.user?.foundUser?.email);
              if (email == "admin@gmail.com") navigate('/airport')
              else navigate('/airlines')
            }

          }
        })
        .catch((err) => {
          showPopUp(`${err?.response?.data}`);
          console.log(err)
          setShowToast(true)
          setToastText('Invalid email/password')

        });
    }

  };
  const showPopUp = (msg) => {
    setPopUpVal();
    setErrMsg(msg);
  };

  const setPopUpVal = () => {
    setPopUp(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon  />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            {/* {isPopUp && <AlertModal open={isPopUp} msg={errMsg} modal={setPopUpVal}/>} */}
            <Grid container spacing={4}>
              <Grid item md={6}>
                <TextField
                   
                  required
                  fullWidth
                  style={{width:"200px",fontSize:"20px"}}
                  id="email"
                  label="Enter Email "
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>

              <Grid item md={6}>
                {!isGSignIn && (
                  <TextField
                    required
                    fullWidth
                    style={{width:"200px",fontSize:"20px"}}
                    name="password"
                    label="Enter Password"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              style={{width:"400px",fontSize:"20px"}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onDefaultSignIn}
              variant="secondary" color="success"
            >
              Sign In
            </Button >
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={`/register`} variant="body2">
                  {"Don't have an account? Register!!"}
                </Link>
              </Grid>
            </Grid>
            <MyToast show={showToast} handleClose={() => setShowToast(false)} text={toastText} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

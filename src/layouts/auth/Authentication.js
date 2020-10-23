import React, { useCallback, useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import * as authAction from "../../store/action/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    ...theme.typography.h1,
    [theme.breakpoints.down("md")]: {
      fontSize: "35px",
    },
  },
}));

const AuthenticationScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const theme = useTheme();

  const matchesSm = useMediaQuery(theme.breakpoints.down("xs"));

  const submitHandler = async (event) => {
    event.preventDefault();
    await dispatch(authAction.login(email, password));
    // console.log(email);
  };

  return matchesSm ? (
    <p>Harus di Desktop</p>
  ) : (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item md={3} xs={3}>
        <Paper className={classes.paper} elevation={0}>
          <Typography className={classes.title} variant="h1">
            Sign In
          </Typography>
          <Typography variant="h5" style={{ marginTop: "8px" }}>
            Nectar App
          </Typography>
          <FormControl style={{ marginTop: "20px" }}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              inputMode="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginTop: "8px" }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type="password"
              inputMode="text"
              required
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitHandler(event);
                }
              }}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            style={{ marginTop: "16px" }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={(event) => submitHandler(event)}
          >
            Sign In
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthenticationScreen;

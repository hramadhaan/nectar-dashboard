import React, { useCallback } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import * as userAction from "../store/action/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuContainer: {
    marginLeft: "auto",
  },
}));

const Appbar = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const submitHandler = useCallback(async (event) => {
    event.preventDefault();
    await dispatch(userAction.logout());
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title}>Dashboard</Typography>
          <IconButton onClick={(event) => submitHandler(event)}>
            <LogoutIcon style={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;

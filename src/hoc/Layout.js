import React from "react";
import { makeStyles } from "@material-ui/core";

import Aux from "./Aux";
import Appbar from "../components/Appbar";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  const isAuth = useSelector((state) => state.auth.token !== null);

  return (
    <Aux>
      {isAuth ? <Appbar /> : undefined}
      <main>{props.children}</main>
    </Aux>
  );
};

export default Layout;

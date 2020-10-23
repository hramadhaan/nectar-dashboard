import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import Aux from "../../hoc/Aux";
import {
  Collapse,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Button,
  useTheme,
  Avatar,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as userAction from "../../store/action/user";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  rootTable: {
    marginTop: theme.spacing(5),
  },
  buttonRemove: {
    ...theme.typography.button,
    color: "white",
    backgroundColor: "red",
    ["&:hover"]: {
      backgroundColor: theme.palette.error.main,
    },
  },
  paper: {
    padding: 20,
  },
}));

const HomeScreen = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [showNotif, setShowNotif] = useState(true);

  const dispatch = useDispatch();

  // console.log(token);

  const users = useSelector((state) => state.user.users);

  const loadUsers = useCallback(async () => {
    try {
      await dispatch(userAction.fetchUser());
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div className={classes.root}>
      <Collapse in={showNotif}>
        <Alert
          icon={false}
          severity="error"
          onClose={() => {
            setShowNotif(false);
          }}
        >
          Sholat jangan ditinggalkan ya sobat :)
        </Alert>
      </Collapse>
      <div>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justify="space-around"
        >
          <Grid item>
            <Paper className={classes.paper}>
              {users && users.length} Users
            </Paper>
          </Grid>
          <Grid item>A</Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          alignItems="center"
          justify="space-around"
        >
          <Grid item>
            <Paper className={classes.paper}>
              {users && users.length} Users
            </Paper>
          </Grid>
          <Grid item>A</Grid>
        </Grid>
        <TableContainer className={classes.rootTable} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell component="th">Nama Lengkap</TableCell>
                <TableCell>Foto Profil</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => {
                  const number = parseInt(user.id) + 1;
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{number}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Avatar
                          alt={user.name}
                          src={`http://192.168.1.10:3080/${user.image}`}
                        />
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Button variant="outlined">Edit</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeScreen;

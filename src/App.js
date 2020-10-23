import React, { Suspense, useEffect } from "react";
import Layout from "./hoc/Layout";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userAction from "./store/action/auth";
import HomeScreen from "./layouts/dashboard/Home";

const Auth = React.lazy(() => {
  return import("./layouts/auth/Authentication");
});

const Home = React.lazy(() => {
  return import("./layouts/dashboard/Home");
});

const App = (props) => {
  const dispatch = useDispatch();

  const onTryAutoSignUp = () => dispatch(userAction.authCheckState());

  const isAuth = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/auth" exact render={(props) => <Auth {...props} />} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact render={(props) => <Home />} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);

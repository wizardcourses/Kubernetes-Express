import React from 'react';
import {Scene, Router, Drawer, Overlay} from 'react-native-router-flux';
import {Icon} from 'native-base';
import Menu from './containers/Menu';
import Profile from './containers/Profile';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import DashBoard from './containers/DashBoard';

const RouterComponent = () => {
  return (
    <Router>
      <Overlay key="overlay">
        <Scene key="root">
          <Scene title="Login" component={LoginForm} />
          <Scene key="signup" title="Signup" component={SignupForm} />
          <Drawer
            contentComponent={Menu}
            hideNavBar
            drawerPosition="left"
            drawerWidth={300}
            drawerIcon={<Icon name="ios-menu" />}>
            <Scene key="main" title="KubeControl" component={DashBoard} />
            <Scene key="profile" component={Profile} />
          </Drawer>
        </Scene>
      </Overlay>
    </Router>
  );
};

export default RouterComponent;

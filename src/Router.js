import React from 'react';
import {
  Scene,
  Router,
  Drawer,
  Overlay,
  Actions,
} from 'react-native-router-flux';
import {Icon, Header, Left, Body, Right, Title} from 'native-base';
import Menu from './containers/Menu';
import Profile from './containers/Profile';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import DashBoard from './containers/DashBoard';

const DashBoardHeader = () => {
  return (
    <Header style={{backgroundColor: '#fff'}}>
      <Left>
        <Icon
          style={{marginLeft: 5, fontSize: 30}}
          onPress={() => Actions.drawerOpen()}
          name="ios-menu"
        />
      </Left>
      <Body style={{flex: 3}}>
        <Title style={{fontFamily: 'BlackOpsOne-Regular', fontSize: 20}}>
          Kubernetes Express
        </Title>
      </Body>
      <Right />
    </Header>
  );
};

const RouterComponent = () => {
  return (
    <Router>
      <Overlay key="overlay">
        <Scene key="root">
          <Scene key="login" hideNavBar title="Login" component={LoginForm} />
          <Scene key="signup" title="Signup" component={SignupForm} />
          <Drawer
            contentComponent={Menu}
            hideNavBar
            drawerPosition="left"
            drawerWidth={300}
            drawerIcon={<Icon name="ios-menu" />}>
            <Scene
              key="main"
              title="Kubernetes Express"
              component={DashBoard}
              navBar={DashBoardHeader}
            />
            <Scene key="profile" title="Profile" component={Profile} />
          </Drawer>
        </Scene>
      </Overlay>
    </Router>
  );
};

export default RouterComponent;

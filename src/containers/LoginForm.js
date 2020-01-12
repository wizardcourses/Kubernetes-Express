import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Card, CardSection, Input, Button} from './common';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import * as actions from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const {email, password} = this.props;
    this.props.loginUser({email, password});
  }

  renderButton() {
    return (
      <View>
        <View style={styles.buttonStyle}>
          <Button onPress={() => this.onButtonPress()}>Login</Button>
        </View>
        <View style={styles.buttonStyle}>
          <Button onPress={() => Actions.signup()}>Signup</Button>
        </View>
      </View>
    );
  }

  renderError() {
    if (this.props.loginError) {
      return (
        <View>
          <Text style={styles.errorText}>{this.props.loginError}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Image
          style={styles.logo}
          source={require('../assets/images/kubernetesExpress.png')}
        />
        <Card>
          <CardSection>
            <Input
              value={this.props.email}
              onChangeText={this.onEmailChange}
              label="Email"
              placeholder="email@email.com"
            />
          </CardSection>
          <CardSection>
            <Input
              value={this.props.password}
              onChangeText={this.onPasswordChange}
              label="Password"
              placeholder="password"
              secureTextEntry
            />
          </CardSection>
          {this.renderError()}
          {this.renderButton()}
        </Card>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 50,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    marginBottom: 20,
  },
  logo: {height: 335, width: 400, alignSelf: 'center'},
};

const mapStateToProps = ({auth}) => {
  const {email, password, loginError, loading} = auth;

  return {email, password, loginError, loading};
};

const mapDispatchToProps = dispatch => ({
  emailChanged: text => dispatch(actions.emailChanged(text)),
  passwordChanged: text => dispatch(actions.passwordChanged(text)),
  loginUser: (email, password) => dispatch(actions.loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

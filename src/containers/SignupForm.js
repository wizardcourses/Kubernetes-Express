import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardSection, Input, Button} from './common';
import {connect} from 'react-redux';
import * as actions from '../actions';

class SignupForm extends Component {
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
    this.props.signupUser({email, password});
  }

  renderButton() {
    return (
      <View style={styles.buttonStyle}>
        <Button onPress={() => this.onButtonPress()}>Login</Button>
      </View>
    );
  }

  renderError() {
    if (this.props.signupError) {
      return (
        <View>
          <Text style={styles.errorText}>{this.props.signupError}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
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
};

const mapStateToProps = ({auth}) => {
  const {email, password, signupError, loading} = auth;

  return {email, password, signupError, loading};
};

const mapDispatchToProps = dispatch => ({
  emailChanged: text => dispatch(actions.emailChanged(text)),
  passwordChanged: text => dispatch(actions.passwordChanged(text)),
  signupUser: (email, password) =>
    dispatch(actions.signupUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

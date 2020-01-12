import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Card, Input, CardSection, Button} from './common';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onUrlChange = this.onUrlChange.bind(this);
    this.onAPIChange = this.onAPIChange.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onUrlChange(text) {
    this.props.urlEntry(text);
  }

  onAPIChange(text) {
    this.props.apiEntry(text);
  }

  onButtonPress() {
    // send action api key and url to fetch the metrics
    // TODO: add action that fetches the metics
    const {apiKey, url} = this.props;

    this.props.fetchMetrics({apiKey, url});
  }

  renderButton() {
    return (
      <View
        style={{
          height: 50,
          marginBottom: 4,
        }}>
        <Button onPress={this.onButtonPress}>Fetch Metrics</Button>
      </View>
    );
  }

  showLogo() {
    return (
      <Image
        style={styles.logo}
        source={require('../assets/images/kubernetesExpress.png')}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        {this.showLogo()}
        <Card>
          <CardSection>
            <Input
              label="Grafana Url"
              secureTextEntry
              placeholder="Grafana Url"
              value={this.props.url}
              onChangeText={this.onUrlChange}
            />
          </CardSection>
          <CardSection>
            <Input
              label="API Key"
              placeholder="API Key"
              secureTextEntry
              value={this.props.apiKey}
              onChangeText={this.onAPIChange}
            />
          </CardSection>
          {this.renderButton()}
        </Card>
        {this.showLogo()}
      </View>
    );
  }
}

const styles = {
  logo: {
    height: 300,
    width: 400,
    alignSelf: 'center',
  },
};
const mapStateToProps = ({api}) => {
  const {loading, apiKey, url} = api;

  return {loading, apiKey, url};
};

const mapDispatchToProps = dispatch => ({
  apiEntry: text => dispatch(actions.apiEntry(text)),
  urlEntry: text => dispatch(actions.urlEntry(text)),
  fetchMetrics: (apiKey, urlEntry) =>
    dispatch(actions.fetchMetrics(apiKey, urlEntry)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

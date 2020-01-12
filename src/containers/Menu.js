import React, {Component} from 'react';
import {Content, ListItem} from 'native-base';
import {View, Text, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Menu extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/images/kubX.png')}
          />
        </View>
        <View style={{flex: 2}}>
          <Content>
            <ListItem onPress={() => Actions.main()}>
              <Text>Dashboard</Text>
            </ListItem>
            <ListItem onPress={() => Actions.profile()}>
              <Text>Profile</Text>
            </ListItem>
            <ListItem onPress={() => Actions.reset('login')}>
              <Text>Logout</Text>
            </ListItem>
          </Content>
        </View>
      </View>
    );
  }
}

import React, {Component} from 'react';
import RouterComponent from './Router';
import {Provider} from 'react-redux';
import {store, persistor} from './configureStore';
import * as firebase from 'firebase';
import {PersistGate} from 'redux-persist/integration/react';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyCdyLYUN0ML553d9ElTjXREdZa7xFAq7zE',
      authDomain: 'kubecontrol-30385.firebaseapp.com',
      databaseURL: 'https://kubecontrol-30385.firebaseio.com',
      projectId: 'kubecontrol-30385',
      storageBucket: 'kubecontrol-30385.appspot.com',
      messagingSenderId: '766691576931',
      appId: '1:766691576931:web:18a13575be85d365883c56',
      measurementId: 'G-4GV98PG34W',
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterComponent />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

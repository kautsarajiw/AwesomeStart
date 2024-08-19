import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Navigation from './navigation/Navigation';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading...</Text>
          </View>
        }
        persistor={persistor}
      >
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

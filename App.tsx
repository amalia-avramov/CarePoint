import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Welcome} from './pages/welcome/Welcome';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Welcome />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

import React from 'react';
import WelcomePage from './pages/welcome/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Welcome' component={WelcomePage} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUpPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

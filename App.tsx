import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './screens/authentication/LoginPage';
import SignUpPage from './screens/authentication/SignUpPage';
import {useAuthState} from './screens/authentication/useAuthState';
import {AddPatient} from './screens/doctor/AddPatient';
import {DoctorHomePage} from './screens/doctor/HomePage';
import {PatientList} from './screens/doctor/PatientListPage';
import {Profile} from './screens/doctor/Profile';
import WelcomePage from './screens/welcome/Welcome';

const Stack = createNativeStackNavigator();

function App() {
  const currentUser = useAuthState();

  return (
    <NavigationContainer>
      {currentUser ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorHome"
        component={DoctorHomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientList"
        component={PatientList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function UnauthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorHome"
        component={DoctorHomePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default App;

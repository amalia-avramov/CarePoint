import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from './screens/authentication/LoginPage';
import SignUpPage from './screens/authentication/SignUpPage';
import {useAuthState} from './screens/authentication/useAuthState';
import {AddMedication} from './screens/doctor/AddMedication';
import {DoctorHomePage} from './screens/doctor/HomePage';
import {PatientList} from './screens/doctor/PatientListPage';
import {Profile} from './screens/doctor/Profile';
import {PatientProfile} from './screens/patient/PatientProfile';
import WelcomePage from './screens/welcome/Welcome';
import { PatientHomePage } from './screens/patient/PatientHomePage';
import { Medication } from './screens/patient/Medication';
import { PatientProfilePage } from './screens/patient/PatientProfilePage';
import { MedicationDetails } from './screens/patient/MedicationDetails';
import { AnalysisPage } from './screens/patient/AnalysisPage';

const Stack = createNativeStackNavigator();

function App() {
  const currentUser = useAuthState();

  return (
    <NavigationContainer>
      {currentUser ? <AuthenticatedDoctorStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}

function AuthenticatedDoctorStack() {
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
        name="PatientProfile"
        component={PatientProfile}
        initialParams={{userId: 0}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddMedication"
        component={AddMedication}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedPatientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PatientHomePage"
        component={PatientHomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Medication"
        component={Medication}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MedicationDetails"
        component={MedicationDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnalysisPage"
        component={AnalysisPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientProfilePage"
        component={PatientProfilePage}
        initialParams={{userId: 0}}
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

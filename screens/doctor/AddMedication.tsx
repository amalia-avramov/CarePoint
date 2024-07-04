import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Stepper from 'react-native-stepper-ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthState} from '../authentication/useAuthState';

interface Program {
  hour: number;
  quantity: number;
  dates: string[];
}

interface Medication {
  name: string;
  administrationMethod: 'oral' | 'inhalation';
  frequency: 'daily' | 'every2days';
  startDate: string;
  endDate?: string;
  program: Program[];
}

interface MedicationProgram {
  diagnostic: string;
  patientId: string;
  doctorId: string;
  medicine: Medication;
}

interface Patient {
  id: string;
  name: string;
}

export function AddMedication({navigation}: {navigation: any}) {
  const [active, setActive] = useState<number>(0);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null); // Use null instead of an empty string
  const [newPatientName, setNewPatientName] = useState<string>('');
  const [diagnostic, setDiagnostic] = useState<string>('');
  const [medicine, setMedicine] = useState<Medication>({
    name: '',
    administrationMethod: 'oral',
    frequency: 'daily',
    startDate: '',
    endDate: '',
    program: [{hour: 0, quantity: 0, dates: []}],
  });
  const currentUser = useAuthState();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsSnapshot = await firestore().collection('patients').get();
        const patientsList = patientsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setPatients(patientsList);
      } catch (error) {
        Alert.alert('Error', 'There was an error fetching the patients');
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (
    field: keyof Medication,
    value: string | number,
  ) => {
    setMedicine({...medicine, [field]: value});
  };

  const handleProgramChange = (
    index: number,
    field: keyof Program,
    value: string | number,
  ) => {
    const newProgram = [...medicine.program];
    newProgram[index] = {...newProgram[index], [field]: value};
    setMedicine({...medicine, program: newProgram});
  };

  const addProgram = () => {
    setMedicine({
      ...medicine,
      program: [...medicine.program, {hour: 0, quantity: 0, dates: []}],
    });
  };

  const saveProgramToFirebase = async () => {
    if (!selectedPatient) {
      Alert.alert('Error', 'Please select a patient');
      return;
    }

    const newProgram: MedicationProgram = {
      diagnostic,
      patientId: selectedPatient,
      doctorId: String(currentUser?.uid),
      medicine,
    };
    try {
      await firestore().collection('programs').add(newProgram);
      Alert.alert('Success', 'Medication program added successfully');
      navigation.navigate('DoctorHome');
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the medication program');
    }
  };

  const createNewPatient = async () => {
    if (!newPatientName) {
      Alert.alert('Error', 'Please enter the new patient name');
      return;
    }

    try {
      const newPatientRef = await firestore()
        .collection('patients')
        .add({name: newPatientName});
      const newPatient: Patient = {id: newPatientRef.id, name: newPatientName};
      setPatients([...patients, newPatient]);
      setSelectedPatient(newPatientRef.id);
      setNewPatientName('');
      Alert.alert('Success', 'New patient created');
    } catch (error) {
      Alert.alert('Error', 'There was an error creating the new patient');
    }
  };

  const renderPatientStep = () => (
    <ScrollView key="patient" style={styles.scrollView}>
      <SelectDropdown
        data={patients.map(patient => ({
          label: patient.name,
          value: patient.id,
        }))}
        onSelect={(selectedItem, index) =>
          setSelectedPatient(patients[index].id)
        }
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.label) || 'Select Patient'}
            </Text>
            <Text style={styles.dropdownButtonArrowStyle}>
              {isOpened ? '▲' : '▼'}
            </Text>
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              backgroundColor: isSelected ? '#D2D9DF' : '#fff',
            }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      <Text style={styles.label}>or Create New Patient</Text>
      <TextInput
        style={styles.input}
        value={newPatientName}
        onChangeText={setNewPatientName}
        placeholder="Enter new patient name"
      />
      <TouchableOpacity style={styles.button} onPress={createNewPatient}>
        <Text style={styles.buttonText}>Create Patient</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderDiagnosticStep = () => (
    <ScrollView key="diagnostic" style={styles.scrollView}>
      <Text style={styles.label}>Diagnostic</Text>
      <TextInput
        style={styles.input}
        value={diagnostic}
        onChangeText={setDiagnostic}
        placeholder="Enter diagnostic"
      />
    </ScrollView>
  );

  const renderMedicineDetailsStep = () => (
    <ScrollView key="medicineDetails" style={styles.scrollView}>
      <Text style={styles.label}>Medicine Name</Text>
      <TextInput
        style={styles.input}
        value={medicine.name}
        onChangeText={text => handleInputChange('name', text)}
        placeholder="Enter medicine name"
      />
      <Text style={styles.label}>Administration Method</Text>
      <TextInput
        style={styles.input}
        value={medicine.administrationMethod}
        onChangeText={text => handleInputChange('administrationMethod', text)}
        placeholder="oral or inhalation"
      />
      <Text style={styles.label}>Frequency</Text>
      <TextInput
        style={styles.input}
        value={medicine.frequency}
        onChangeText={text => handleInputChange('frequency', text)}
        placeholder="daily or every2days"
      />
      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        value={medicine.startDate}
        onChangeText={text => handleInputChange('startDate', text)}
        placeholder="Enter start date"
      />
      <Text style={styles.label}>End Date (optional)</Text>
      <TextInput
        style={styles.input}
        value={medicine.endDate}
        onChangeText={text => handleInputChange('endDate', text)}
        placeholder="Enter end date"
      />
    </ScrollView>
  );

  const renderProgramScheduleStep = () => (
    <ScrollView key="programSchedule" style={styles.scrollView}>
      {medicine.program.map((program, index) => (
        <View key={`program-${index}`}>
          <Text style={styles.label}>Program Hour</Text>
          <TextInput
            style={styles.input}
            value={String(program.hour)}
            onChangeText={text =>
              handleProgramChange(index, 'hour', Number(text))
            }
            placeholder="Enter hour"
          />
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={String(program.quantity)}
            onChangeText={text =>
              handleProgramChange(index, 'quantity', Number(text))
            }
            placeholder="Enter quantity"
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={addProgram}>
        <Text style={styles.buttonText}>Add Program Time</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderReviewStep = () => (
    <ScrollView key="review" style={styles.scrollView}>
      <Text style={styles.label}>Diagnostic: {diagnostic}</Text>
      <Text style={styles.label}>Medicine Name: {medicine.name}</Text>
      <Text style={styles.label}>
        Administration Method: {medicine.administrationMethod}
      </Text>
      <Text style={styles.label}>Frequency: {medicine.frequency}</Text>
      <Text style={styles.label}>Start Date: {medicine.startDate}</Text>
      <Text style={styles.label}>End Date: {medicine.endDate}</Text>
      {medicine.program.map((program, index) => (
        <View key={`reviewProgram-${index}`}>
          <Text style={styles.label}>Program Hour: {program.hour}</Text>
          <Text style={styles.label}>Quantity: {program.quantity}</Text>
        </View>
      ))}
    </ScrollView>
  );

  const content = [
    renderPatientStep(),
    renderDiagnosticStep(),
    renderMedicineDetailsStep(),
    renderProgramScheduleStep(),
    renderReviewStep(),
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DoctorHome')}
        style={{marginVertical: 20}}>
        <Icon name="arrow-left" size={30} />
      </TouchableOpacity>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive(p => p - 1)}
        onFinish={saveProgramToFirebase}
        onNext={() => setActive(p => p + 1)}
        stepStyle={styles.stepperStep}
        buttonStyle={styles.stepperButton}
        buttonTextStyle={styles.stepperButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    marginTop: 60,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  stepperStep: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'black',
    color: 'white',
  },
  stepperButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  stepperButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});

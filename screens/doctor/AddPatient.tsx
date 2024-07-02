import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Stepper from 'react-native-stepper-ui';

export function AddPatient() {
  const [active, setActive] = useState(0);

  function alert(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={{marginVertical: 80, marginHorizontal: 20}}>
      <Stepper
        active={active}
        content={content}
        onBack={() => setActive(p => p - 1)}
        onFinish={() => alert('Finish')}
        onNext={() => setActive(p => p + 1)}
      />
    </View>
  );
}

const MyComponent = ({title}: {title: string}) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const content = [
  <MyComponent title="Component 1" />,
  <MyComponent title="Component 2" />,
  <MyComponent title="Component 3" />,
];

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

// Define type for user
type User = FirebaseAuthTypes.User | null;

// Custom hook to manage authentication state
export const useAuthState = (): User => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

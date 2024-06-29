import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// Gets the current user
export const getCurrentUser = () => {
  return auth().currentUser;
};

// Sign up new users
export const signUp = async (
  email: string,
  password: string,
): Promise<{user: FirebaseAuthTypes.User | undefined; error?: any}> => {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    return {user: undefined, error: error};
  }
};

// Sign in existing users
export const signIn = async (
  email: string,
  password: string,
): Promise<{success: boolean; error?: any}> => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return {success: true};
  } catch (error) {
    return {success: false, error: error};
  }
};

// Sign out
export const signOut = async (): Promise<{success: boolean; error?: any}> => {
  try {
    await auth().signOut();
    return {success: true};
  } catch (error) {
    return {success: false, error: error};
  }
};

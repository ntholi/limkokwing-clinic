import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const updateDisplayName = async (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      displayName: displayName,
    });
  }
};

export const logout = () => {
  return signOut(getAuth());
};

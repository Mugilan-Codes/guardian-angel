import React, { createContext, useState } from 'react';

import { firebase_auth } from '../database/firebaseDB';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
        login: async (email, password, role = 'guardian') => {
          try {
            await firebase_auth.signInWithEmailAndPassword(email, password);
            setRole(role);
          } catch (err) {
            console.log(err);
          }
        },
        register: async (email, password, role = 'guardian') => {
          try {
            await firebase_auth.createUserWithEmailAndPassword(email, password);
            setRole(role);
          } catch (err) {
            console.log(err);
          }
        },
        logout: async () => {
          try {
            await firebase_auth.signOut();
          } catch (err) {
            console.log(err);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

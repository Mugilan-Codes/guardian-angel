import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('@user_data');
    return userData != null ? JSON.parse('@user_data') : null;
  } catch (e) {
    console.log(`Getting Token Error: ${e}`);
    return null;
  }
};

export const storeToken = async (user) => {
  try {
    await AsyncStorage.setItem('@user_data', JSON.stringify(user));
  } catch (e) {
    console.log(`Storing Token Error: ${e}`);
    return null;
  }
};

// 'user' or ['guardian']
export const storeRole = async (role = 'guardian') => {
  try {
    await AsyncStorage.setItem('@user_role', role);
  } catch (e) {
    // saving error
  }
};

export const getRole = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_role');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

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

  console.log('Stored Token');
};

// 'user' or ['guardian']
export const storeRole = async (role = 'guardian') => {
  try {
    await AsyncStorage.setItem('@user_role', role);
  } catch (e) {
    console.log(`Storing Role Error: ${e}`);
    return null;
  }

  console.log(`Stored Role as ${role}`);
};

export const getRole = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_role');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(`Getting Role Error: ${e}`);
    return null;
  }
};

export const removeTokenAndRole = async () => {
  const keys = ['@user_data', '@user_role'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(`Removing Token and Role from Storage Error: ${e}`);
    return null;
  }

  console.log('Async Storage Cleared');
};

import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('user_data');
    const data = JSON.parse(userData);
    console.log({ userData, data });
    if (data !== null) {
      return data;
    }
  } catch (e) {
    console.log(`Getting Token Error: ${e}`);
    return null;
  }
};

export const storeToken = async (user) => {
  try {
    await AsyncStorage.setItem('user_data', JSON.stringify(user));
  } catch (e) {
    console.log(`Storing Token Error: ${e}`);
    return null;
  }
};

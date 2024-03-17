import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
  //save or update an item
  async saveItem(key: string, value: any) {
    try {
      const storeValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, storeValue);
    } catch (error: any) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //load item from async storage
  async loadItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error: any) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //delete item from async storage
  async deleteItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error: any) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  //function to get all the stored keys
  async fetchAllKeys() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error: any) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
};

export default deviceStorage;

import { AsyncStorage } from 'react-native';

export const SaveToLocalS = (key, data) => {
  AsyncStorage.setItem(
    key,
    JSON.stringify(data),)
}


export const GetFromLocalS = (key) => {
 return AsyncStorage.getItem(key, (err, data) => {})
}


export const RemoveAllLocalS = () => {
  let keys = ['ssn','phonenumber','email','country'];
AsyncStorage.multiRemove(keys, (err) => {
  // keys k1 & k2 removed, if they existed
  // do most stuff after removal (if you want)
});
}

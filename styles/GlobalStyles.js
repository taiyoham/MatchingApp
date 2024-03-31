import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "white"
  },
  Maincontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fffdfa"
  },

  // TextInput>
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default GlobalStyles;

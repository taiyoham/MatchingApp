import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/themes';

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

  // <TextInput>
  TextInput: {
    minHeight: 40,
    borderWidth: 1,
    padding: 10,
  },
  DefaultTextInput: {
    width: 250,
    marginTop: 13,
  },
});

export default GlobalStyles;

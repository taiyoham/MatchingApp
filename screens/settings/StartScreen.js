// アプリ起動後、最初に表示されるコンポーネント

import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';



export default function StartScreen() {
  return (
    <>
    <Text>ようこそ</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
});

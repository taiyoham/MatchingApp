// アプリ起動後、最初に表示されるコンポーネント

import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../../styles/GlobalStyles';



export default function StartScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <View style={GlobalStyles.Maincontainer}>
        <Text>ようこそ。</Text>
        <Button
          title='ログイン'
        ></Button>
        <Button
          title='新規登録'
          onPress={() => navigation.navigate('新規登録')}
        >新規登録</Button>
      </View>
    </SafeAreaView>
  );
}
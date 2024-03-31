// 新規アカウント作成用コンポーネント

import { StyleSheet, Text, View, Button } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SignUpScreen({navigation}) {
  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <View style={GlobalStyles.Maincontainer}>
        <Text>登録方法を選択して下さい。</Text>
        <Button
          title='メールアドレスで登録'
          onPress={() => navigation.navigate('メールで登録')}
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

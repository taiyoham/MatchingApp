// アカウント作成後の初期設定用コンポーネント

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';



export default function InitialSettingScreen(navigation) {






  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <View style={GlobalStyles.Maincontainer}>
        <Text>名前を教えて下さい。</Text>
        <TextInput></TextInput>
      </View>
    </SafeAreaView>
  );
}


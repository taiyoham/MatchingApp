// アカウント作成後の初期設定用コンポーネント

import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../constants/themes';



export default function InitialNameSettingScreen(navigation) {


  const [nickname, setNickname] = useState();
  const [error, setError] = useState();
  const [borderColor, setBorderColor] = useState("black");

  // 「次へ」を押した際に実行する関数
  const SubmitEvent = () => {
    if(nickname === undefined || nickname === "") {
      setError("ニックネームを入力して下さい。");
      setBorderColor(COLORS.ERROR);
    }else if(nickname.length > 25) {
      setError("ニックネームは25文字以内にして下さい。");
    }else {
      
    }
  }


    // <TextInput>の入力時に実行する関数
    const handleTextInput = (inputText) => {
      setNickname(inputText);
    }



  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
        <KeyboardAwareScrollView>
          <View style={GlobalStyles.Maincontainer}>

          <Text>あなたのニックネームは？</Text>
          <TextInput
            style={[GlobalStyles.TextInput, GlobalStyles.DefaultTextInput, {borderColor}]}
            onChangeText={ (inputText) => handleTextInput(inputText) }
            placeholder="ニックネームを入力して下さい。"
            inputMode="text"
            value={nickname}
          />
          <Text style={{color:COLORS.ERROR}}>{error}</Text>

          <Button
            title='次へ'
            onPress={SubmitEvent}
          ></Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}





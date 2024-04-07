// アカウント作成後の初期設定（名前）用コンポーネント

import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../constants/themes';
import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";



// DBのデータ更新（ニックネーム）
const updateNickname = async(uid, nickname, navigation)=> {
    try {
      await setDoc(doc(db, "users", uid), {
        nickname,
      });
      navigation.navigate("初期設定（画像）");
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}


export default function InitialNameSettingScreen({navigation}) {

  
  const uid = useSelector((state) => state.uid.value);


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
      updateNickname(uid, nickname, navigation);
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
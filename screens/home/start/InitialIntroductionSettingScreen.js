// アカウント作成後の初期設定（自己紹介）用コンポーネント

import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../constants/themes';
import { db } from '../../../firebaseConfig';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";



// DBのデータ更新（ニックネーム）
const updateNickname = async(uid, nickname, navigation)=> {

    try {
      await setDoc(doc(db, "users", uid), {
        nickname,
      }, { merge: true });
      navigation.navigate("初期設定（画像）");
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}


export default function InitialIntroductionSettingScreen({navigation}) {

  
  const uid = useSelector((state) => state.uid.value);
  const [introduction, setIntroduction] = useState();

  // 「次へ」を押した際に実行する関数
  const SubmitEvent = () => {
    updateNickname(uid, nickname, navigation);
  }


    // <TextInput>の入力時に実行する関数
    const handleTextInput = (inputText) => {
      setIntroduction(inputText);
    }



  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
        <KeyboardAwareScrollView>
          <View style={GlobalStyles.Maincontainer}>

          <Text>最後に自己紹介文を入力して下さい！</Text>

          <Button
            title='次へ'
            onPress={SubmitEvent}
          ></Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
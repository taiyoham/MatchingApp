// メールで新規アカウント作成用コンポーネント

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import PasswordEye from 'react-native-password-eye';
import { auth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUid } from '../../../redux/uidSlice';



export default function MailSignUpScreen({navigation, type}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const dispatch = useDispatch();


  // <TextInput>の入力時に実行する関数
  const handleTextInput = (inputText, inputType) => {

    switch(inputType) {
      case "email":
        setEmail(inputText);
        break; 

      case "password":
        setPassword(inputText);
        break; 

      default:
        break;
    }
  }






  // アカウント作成・ログイン実行関数
  const createAccount = async () => {
    // アカウント作成
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      console.log("作成成功");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

    // ログイン
    await signInWithEmailAndPassword(auth, email, password)
    // ログイン処理成功時
    .then((userCredential) => {
      // const user = userCredential.user;
      console.log("ログイン成功");
    })
    // ログイン処理失敗時
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    // 情報取得
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        const uid = user.uid;
        console.log(`${user}でログイン中/MailSignUp`);
        dispatch(setUid(uid));
        navigation.navigate("initialSetting");
        
      } else {
        console.log(`ゲストでログイン中/MailSignUp`);
      }
    });
  }









  // バリデーション関数
  const validateValue = () => {
    let emailProblem = false;
    let passwordProblem = false;
    
    // メールアドレス
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(emailPattern.test(email)) {
      setEmailError("");
    }else {
      setEmailError("正しいメールアドレスを入力して下さい。");
      emailProblem = true;
    }

    // パスワード
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
    if(passwordPattern.test(password)) {
      setPasswordError("");
    }else {
      setPasswordError("有効なパスワードを入力して下さい。");
      passwordProblem = true;

    }

    // 問題無ければ、アカウント登録・ログイン処理実行
    if(!emailProblem && !passwordProblem) {
      createAccount();
    }
  }
  


  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <View style={GlobalStyles.Maincontainer}>

        <TextInput
          style={[GlobalStyles.TextInput, styles.TextInput]}
          placeholder="メールアドレスを入力して下さい。"
          onChangeText={ (inputText) => handleTextInput(inputText, "email") }
          keyboardType="email-address"
          inputMode="email"
          value={email}
        />
        <Text>
          {emailError}
        </Text>

        <PasswordEye
          style={[GlobalStyles.TextInput, styles.TextInput]}
          onChangeText={ (inputText) => handleTextInput(inputText, "password") }
          value={password}
          placeholder="パスワードを入力して下さい。"
          hint="大文字英字、小文字英字、数字を含む8-14文字の長さで設定してください。"
          hintStyles={styles.PasswordHint}
        />
        <Text>
          {passwordError}
        </Text>

        <Button
          title='アカウント作成'
          onPress={() => validateValue()}
        ></Button>
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  TextInput: {
    width: 250,
  },
  PasswordHint: {
    width: 250,
  }
});
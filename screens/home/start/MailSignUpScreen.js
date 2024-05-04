// メールで新規アカウント作成用コンポーネント

import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import PasswordEye from 'react-native-password-eye';
import { auth, db } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore"; 
import { useDispatch } from 'react-redux';
import { setUid } from '../../../redux/uidSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../constants/themes';



export default function MailSignUpScreen({navigation, type}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  
  const [passwordBorderColor, setPasswordBorderColor] = useState("black");
  const [emailBorderColor, setEmailBorderColor] = useState("black");
  
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





  // DBデータ作成関数
  const createData = async (uid) => {

    try {
      await setDoc(doc(db, "users", uid), {});
      navigation.navigate("初期設定（ニックネーム）");
    } catch (e) {
      console.error("Error adding document: ", e);
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
    })
    // ログイン処理失敗時
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    // 情報取得
    await onAuthStateChanged(auth, (user) => {
      
      if (user) {
        const uid = user.uid;
        console.log(`${user}でログイン中/MailSignUp`);
        dispatch(setUid(uid));
        
        createData(uid);
      } else {
        console.error(`正しくアカウント作成が行われていません。`);
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
      setEmailBorderColor("black");
    }else {
      setEmailError("正しいメールアドレスを入力して下さい。");
      setEmailBorderColor(COLORS.ERROR);
      emailProblem = true;
    }

    // パスワード
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
    if(passwordPattern.test(password)) {
      setPasswordError("");
      setPasswordBorderColor("black");
    }else {
      setPasswordError("有効なパスワードを入力して下さい。");
      setPasswordBorderColor(COLORS.ERROR);
      passwordProblem = true;

    }

    // 問題無ければ、アカウント登録・ログイン処理実行
    if(!emailProblem && !passwordProblem) {
      createAccount();
    }
  }
  


  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <KeyboardAwareScrollView>
        <View style={GlobalStyles.Maincontainer}>

          <TextInput
            style={[GlobalStyles.TextInput, GlobalStyles.DefaultTextInput, {borderColor: emailBorderColor}]}
            placeholder="メールアドレスを入力して下さい。"
            onChangeText={ (inputText) => handleTextInput(inputText, "email") }
            keyboardType="email-address"
            inputMode="email"
            value={email}
          />
          <Text style={{color:COLORS.ERROR}}>
            {emailError}
          </Text>

          <PasswordEye
            style={[GlobalStyles.TextInput, GlobalStyles.DefaultTextInput, {borderColor: passwordBorderColor}]}
            onChangeText={ (inputText) => handleTextInput(inputText, "password") }
            value={password}
            placeholder="パスワードを入力して下さい。"
            hint="大文字英字、小文字英字、数字を含む8-14文字の長さで設定してください。"
            hintStyles={styles.PasswordHint}
          />
          <Text style={{color:COLORS.ERROR}}>
            {passwordError}
          </Text>

          <Button
            title='アカウント作成'
            onPress={() => validateValue()}
          ></Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  PasswordHint: {
    width: 250,
  }
});
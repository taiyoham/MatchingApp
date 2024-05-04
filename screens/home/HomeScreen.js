// Homeコンポーネント

import { StyleSheet, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setUid } from "../../redux/uidSlice";





// ログインしているかどうか確認する関数
const checkLogin = async (dispatch, navigation) => {

  let uid;
  
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        uid = user.uid;
        dispatch(setUid(uid));
      }
    });
    
    if(typeof uid === "undefined") {
      console.log(`ログアウト中`);
      navigation.navigate("StartScreen");
    }else {
      console.log(`${uid}でログイン中`);
    }

  } catch (error) {
    console.error(error);
  }
}






export default function HomeScreen() {


  const dispatch = useDispatch();
  const uid = useSelector((state) => state.uid.value);
  const navigation = useNavigation();
  
  useEffect(()=>{
    checkLogin(dispatch, navigation);
  }, []);
  


  return (
    <>
    <Text>Home</Text>
    <Button
      title='初期設定（ニックネーム）'
      onPress={() => navigation.navigate('初期設定（ニックネーム）')}
    >ニックネーム初期設定</Button>
    <Button
      title='初期設定（画像）'
      onPress={() => navigation.navigate('初期設定（画像）')}
    >画像初期設定</Button>
    </>
  );
}
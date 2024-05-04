// アカウント作成後の初期設定（プロフィール画像）用コンポーネント

import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { useSelector } from 'react-redux';
import GlobalStyles from '../../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { COLORS } from '../../../constants/themes';
import { db } from '../../../firebaseConfig';
import { doc, setDoc, getDocs, getDoc, collection, count } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as FileSystem from 'expo-file-system';












export default function InitialImageSettingScreen({navigation}) {

  const uid = useSelector((state) => state.uid.value);
  const storage = getStorage();
  const [error, setError] = useState();
  const [orderNumber, setOrderNumber] = useState(1);


  const [images, setImages] = useState(null);





  

// 画像選択させる関数
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0,
  });



  if (!result.canceled) {

    // ファイル拡張子取得
    let fileName = Date.now();
    let imageUri = result.assets[0].uri;
    const response = await fetch(imageUri);
    const blob = await response.blob();

    let updatedImages = {...images};
    updatedImages[Date.now()] = imageUri;
    
    const fileRef = await ref(storage, `user_main_images/${uid}/${fileName}`);
  


    try {
      // ストレージ保存
      await uploadBytes(fileRef, blob );
      console.log("アップ成功");

      // DBデータ作成
      const usersDocRef = doc(db, "users", uid);
      const mainImagesCollectionRef = collection(usersDocRef, "main_images");
      const data = {
        order_number: orderNumber,
        file_name: fileName,
      };
      await setDoc(doc(mainImagesCollectionRef), data);
  
      setImages(updatedImages);
      setOrderNumber(prevCount => prevCount+1);

    } catch (error) {
      console.error(error);
    }
  }
};







  // 「次へ」を押した際に実行する関数
  const SubmitEvent = () => {
    navigation.navigate("初期設定（自己紹介）");
  }


  // 「画像をアップロード」ボタンを表示する関数
  const showUploadButton = () => {
    if(images == null || Object.keys(images).length < 5) {
      return (
        <Button title="画像をアップロード" onPress={pickImage} />
      );
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.SafeAreaView}>
      <KeyboardAwareScrollView>
        <View style={GlobalStyles.Maincontainer}>

          <Text>あなたの画像をアップして下さい。</Text>
          <Text style={{color:COLORS.ERROR}}>{error}</Text>

          {showUploadButton()}
          <View>
          {images && Object.values(images).map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
          </View>

          <Button
            title='次へ'
            onPress={SubmitEvent}
          ></Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
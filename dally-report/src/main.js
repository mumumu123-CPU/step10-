console.log("Hello World");

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyCGNRoaVD0jpCGWk67djWgCW3xNgKSpl8Y",
  authDomain: "daily-report-4cb09.firebaseapp.com",
  projectId: "daily-report-4cb09",
  storageBucket: "daily-report-4cb09.firebasestorage.app",
  messagingSenderId: "92144983290",
  appId: "1:92144983290:web:45005e018f3a024ae5bd43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Cloud Firestoreの初期化
const ab = getFirestore(app);

//Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

    //reportsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(ab,"reports"));

    //データをテーブル表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tags += `<tr><td>${doc.data().data}</td><td>${doc.data().name}
      </td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
    });
    document.getElementById("js-history").innerHTML = tags;
};

//Cloud Firestoreから取得したデータを表示する
if(document.getElementById("js-history")){
  fetchHistoryData();
}

//Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try{
    const docRef = await addDoc(collection(ab,"reports"),{
      data: new Date(),
      name: formData.get("name"),
      work:formData.get("work"),
      comment: formData.get("comment"),
    });
    console.log("Document written with ID:",docRef.id);
  } catch(e) {
    console.log("Error adding document:",e);
  }
}

//Cloud Firedtoreにデータを送信する
if(document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit",(e) =>  submitData(e));
};


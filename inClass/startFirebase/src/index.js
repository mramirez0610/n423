import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  collection,
  addDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGqmPDDojAfH8tqDM3HeCmt-yzQbdEihA",
  authDomain: "n423-data.firebaseapp.com",
  projectId: "n423-data",
  storageBucket: "n423-data.appspot.com",
  messagingSenderId: "282050919444",
  appId: "1:282050919444:web:0e94c7e254f210f6fa7b01",
  measurementId: "G-3H5LGNZJLZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

var logInButton = document.getElementById("login");
var logOutButton = document.getElementById("logout");
var addUserButton = document.getElementById("addUser");
let getAllDataButton = document.getElementById("getAllData");

logInButton.addEventListener("click", login);
logOutButton.addEventListener("click", logout);
addUserButton.addEventListener("click", addUserToDB);
getAllDataButton.addEventListener("click", getAllData);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in", user);
  } else {
    console.log("no user");
  }
});

function addUserToDB() {
  let fn = document.getElementById("fName").value.toLowerCase();
  let ln = document.getElementById("lName").value.toLowerCase();
  let em = document.getElementById("email").value.toLowerCase();
  let pw = document.getElementById("pw").value.toLowerCase();

  let person = {
    firstName: fn,
    lastName: ln,
    email: em,
    password: pw,
  };

  addData(person);
}

async function addData(person) {
  try {
    const docRef = await addDoc(collection(db, "Pirates"), person);

    console.log("id: ", docRef.id);

    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pw").value = "";
  } catch (e) {
    console.log(e);
  }
}

async function getUser(userId) {
  const docRef = doc(db, "Pirates", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let user = docSnap.data();
    $("#userData").html(
      `<input class="name" type="text" id="userFN" value="${user.firstName}" disabled>`
    );
  } else {
    console.log("No document!");
  }
}

function addUserEditBtnListener() {
  $("#allData button").on("click", (e) => {
    console.log(e.currentTarget.id);
    getUser(e.currentTarget.id);
  });
}

async function getAllData() {
  document.getElementById("allData").innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "Pirates"));

  querySnapshot.forEach((doc) => {
    console.log("aaa");
    document.getElementById("allData").innerHTML += `<div>
        <p class="name">${doc.data().firstName}</p>
        <p class="name">${doc.data().lastName}</p>
        <p class="name">${doc.data().emailName}</p>
        <button id="${doc.id}">Get User</button>
    </div>`;
  });

  addUserEditBtnListener();
}

function login() {
  signInAnonymously(auth)
    .then(() => {
      console.log("signed in");
    })
    .catch((error) => {
      console.log(error.code);
    });
}

function logout() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log(error.code);
    });
}

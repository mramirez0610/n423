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
  where,
  query,
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

let expQuery = document.getElementById("Experimental");
let techQuery = document.getElementById("Techno");

expQuery.addEventListener("click", getQuery);
techQuery.addEventListener("click", getQuery);

async function getAlbums() {
  document.getElementById("app").innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "Albums"));

  querySnapshot.forEach((doc) => {
    document.getElementById("app").innerHTML += `
      <div class="album">
        <img src="${doc.data().albumPhoto}" />
        <h2>${doc.data().albumName}</h2>
        <p>${doc.data().artistName}</p>
        <p>${doc.data().albumGenre}</p>
      </div>
    `;
  });
}

async function getQuery(e) {
  console.log(e.target.id);

  const q = query(
    collection(db, "Albums"),
    where("albumGenre", "==", e.target.id)
  );

  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        console.log(doc);
        $("#app").html(`<div class="album">
        <img src="${doc.data().albumPhoto}" />
        <h2>${doc.data().albumName}</h2>
        <p>${doc.data().artistName}</p>
        <p>${doc.data().albumGenre}</p>
      </div>`);
      });
    } else {
      console.log("No results");
    }
  } catch (e) {
    console.log(e);
  }
}

function initListeners() {
  getAlbums();
}

$(document).ready(function () {
  initListeners();
});
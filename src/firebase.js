import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBl-XlYM_0a17Gv2PYfcj79O0i8zsYp6tc",
  authDomain: "netflix-clone-62ed3.firebaseapp.com",
  projectId: "netflix-clone-62ed3",
  storageBucket: "netflix-clone-62ed3.firebasestorage.app",
  messagingSenderId: "75196767211",
  appId: "1:75196767211:web:5d5d6f8c9e93db96df17ae"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, signUp, login, logout };
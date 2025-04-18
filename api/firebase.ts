import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

//firebase error object
const firebaseErrorMap: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/missing-password": "Password is required.",
  "auth/invalid-credential": "Invalid Credentials",
};

const formatFirebaseError = (code: any) => {
  const errorMessage = firebaseErrorMap[code] || "An unexpected error occurred.";

  return {
    response: {
      status: 400,
    },
    data: {
      code: code,
      message: errorMessage,
    },
  };
};

// API methods
export const firebaseApi = {
  // GET request
  loginWithEmailAndPassword: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      return data.user;
    } catch (error: any) {
      throw formatFirebaseError(error.code);
    }
  },
  registerUserWithEmailAndPassword: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      return data.user;
    } catch (error: any) {
      throw formatFirebaseError(error.code);
    }
  },
  get: async (collectionName: string): Promise<any> => {
    try {
      const dataCol = collection(db, collectionName);
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      return dataList;
    } catch (error: any) {
      const errorMessage = firebaseErrorMap[error.code] || "An unexpected error occurred.";
      throw formatFirebaseError(error.code);
    }
  },
  getById: async ({
    collectionName,
    docId,
  }: {
    collectionName: string;
    docId: string;
  }): Promise<any> => {
    try {
      const dataCol = collection(db, collectionName);
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      const data = dataList?.find(ele => ele?.id === docId);
      if (!data) throw { status: 401, message: "document not found" };
      return data;
    } catch (error: any) {
      throw formatFirebaseError(error.code);
    }
  },
  getManyByIds: async ({
    collectionName,
    docIds,
  }: {
    collectionName: string;
    docIds: string[];
  }): Promise<any> => {
    try {
      const dataCol = collection(db, collectionName);
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());

      let data: any = [];
      docIds?.forEach(id => {
        const res = dataList?.find(doc => doc?.id === id);
        data.push(res);
      });
      if (!data) throw { status: 401, message: "document not found" };
      return data;
    } catch (error) {
      throw error;
    }
  },
};

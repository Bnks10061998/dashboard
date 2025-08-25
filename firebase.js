import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

// User Authentication Functions
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error.message);
  }
};

// Group Creation
const createGroup = (groupName, members, userId) => {
  const groupRef = ref(db, "groups");
  const newGroupRef = push(groupRef); // Generate a new group ID
  const groupData = {
    name: groupName,
    members: members.reduce((acc, member) => {
      acc[member] = true;
      return acc;
    }, {}),
    createdAt: Date.now(),
    createdBy: userId,
  };

  set(newGroupRef, groupData);
};

// Send Message
const sendMessage = (groupId, message, senderId) => {
  const messagesRef = ref(db, `groups/${groupId}/messages`);
  const newMessageRef = push(messagesRef);
  const messageData = {
    text: message,
    sender: senderId,
    timestamp: Date.now(),
  };

  set(newMessageRef, messageData);
};

// Image Upload to Firebase Storage
const uploadImage = (file, path) => {
  const storageRef = storageRef(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

// Push Notifications
const requestPushPermission = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
    if (currentToken) {
      console.log("Token retrieved:", currentToken);
      return currentToken;
    } else {
      console.log("No token available.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

const handleIncomingMessage = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    // Handle foreground notifications
  });
};

// User Presence
const setUserPresence = (userId, isOnline) => {
  const presenceRef = ref(db, `users/${userId}/status`);
  set(presenceRef, { online: isOnline, lastSeen: Date.now() });
};

// Get Messages in Real-Time
const getMessages = (groupId, callback) => {
  const messagesRef = ref(db, `groups/${groupId}/messages`);
  onValue(messagesRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });
};

export {
  db,
  auth,
  storage,
  messaging,
  signUp,
  login,
  logout,
  createGroup,
  sendMessage,
  uploadImage,
  requestPushPermission,
  handleIncomingMessage,
  setUserPresence,
  getMessages,
};

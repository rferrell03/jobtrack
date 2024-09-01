import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBsB8K-M-anYdU6MMwbyAHc38V43UfrTeM",
  authDomain: "jobtracker-23cd3.firebaseapp.com",
  databaseURL: "https://jobtracker-23cd3-default-rtdb.firebaseio.com",
  projectId: "jobtracker-23cd3",
  storageBucket: "jobtracker-23cd3.appspot.com",
  messagingSenderId: "442878083201",
  appId: "1:442878083201:web:039f13270b7bb352874d80",
  measurementId: "G-LZERLGJKNJ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
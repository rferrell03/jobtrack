import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import auth from "../firebaseSetup";
export default function LogIn() {

    const [error, setError] = useState(false)
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            setError(false)
        } catch (e) {
            setError(true)
        }
    }

    return (
        <>
            <div className="centerBox">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    
                    <h1>Log in / Sign up</h1>
                    {error && <p>There was a problem signing in! Please try again.</p>}
                    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                </div>
            </div>
        </>
    );
}
import { useState } from "react";
import { database } from "../firebaseSetup";
import { ref, set } from "firebase/database";
import auth from "../firebaseSetup";
import { v4 } from "uuid";
export default function AddJobScreen({closeAddJob}) {

    const [jobTitle, setJobTitle] = useState('');

    const handleJobSubmit = (e) => {
        e.preventDefault()
        submitToDatabase(auth.currentUser.uid , jobTitle, getDate())
    }

    function submitToDatabase(userId, jobTitle, date) {
        const uid = v4()
        set(ref(database, 'users/' + userId + '/jobs/' + uid), {
            jobTitle: jobTitle,
            dateAdded: date,
            status: "default",
            jobID: uid,
        })
        closeAddJob()
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }       

    return (
        <div className="addJobScreen">
            <form onSubmit={handleJobSubmit}>
                <h2>Add New Job</h2>
                <label htmlFor="jobTitle">Job Title:</label>
                <input
                    type="text"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />
                <button type="submit">Create Job</button>
                <button type="button" onClick={closeAddJob}>Cancel</button>
            </form>
        </div>
    );

    
}
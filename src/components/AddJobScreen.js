import { useState } from "react";
export default function AddJobScreen({closeAddJob}) {

    const [jobTitle, setJobTitle] = useState('');

    const handleJobSubmit = (e) => {
        e.preventDefault()
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
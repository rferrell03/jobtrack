import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import auth, { database } from "../firebaseSetup";
export default function JobArea({jobTitle, status, notes, jobID}) {
    const [notesAreaHeight, setNotesAreaHeight] = useState('10vh');
    const [applicationStatus, setApplicationStatus] = useState("default");
    const [appStatusStyles, setAppStatusStyles] = useState({});
    const toggleNotesAreaHeight = () => {
        setNotesAreaHeight(notesAreaHeight === '10vh' ? '30vh' : '10vh');
    };

    const toggleStatusRed = () => {
        if(applicationStatus != "red"){
            toggleApplicationStatus("red")
        } else {
            toggleApplicationStatus("default")

        }   
    }

    const toggleStatusGreen = () => {
        if(applicationStatus != "green"){
            toggleApplicationStatus("green")
        } else {
            toggleApplicationStatus("default")

        }   
    }

    const toggleStatusYellow = () => {
        if(applicationStatus != "yellow"){
            toggleApplicationStatus("yellow")
        } else {
            toggleApplicationStatus("default")

        }   
    }

    useEffect(() => {
        toggleApplicationStatus(status);
    }, [status]);

    const toggleApplicationStatus = (status) => {
        if (status !== "default") {
            setApplicationStatus("default")
        }
        switch (status) {
            case "green": setAppStatusStyles({ backgroundColor: "#29c702", color: "white" }); setApplicationStatus("green"); uploadStatus("green"); break;
            case "red": setAppStatusStyles({ backgroundColor: "#bd4057", color: "white" }); setApplicationStatus("red"); uploadStatus("red"); break;
            case "yellow": setAppStatusStyles({ backgroundColor: "#baa716", color: "white" }); setApplicationStatus("yellow"); uploadStatus("yellow"); break;
            case "default": setAppStatusStyles({backgroundColor: "#110f12", color:"white"}); setApplicationStatus("default"); uploadStatus("default"); break;
        }
    }

    const handleSaveButton = () => {
        const textareaValue = document.querySelector('.notesArea textarea').value;
        set(ref(database, 'users/' + auth.currentUser.uid + '/jobs/' + jobID + "/notes"), textareaValue)
    }

    const uploadStatus = (newStatus) => {
        set(ref(database, 'users/' + auth.currentUser.uid + '/jobs/' + jobID + "/status"), newStatus)
    }

    return (
        <>
            <div className="jobArea" style={{height: notesAreaHeight, ...appStatusStyles}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"} }>
                    <h2>{jobTitle}</h2>
                    <button onClick={toggleNotesAreaHeight}>Write notes</button>
                    <button onClick={toggleStatusGreen}>Checkmark</button>
                    <button onClick={toggleStatusYellow}>interviewing</button>
                    <button onClick={toggleStatusRed}> X </button>
                    <button>Delete Application</button>
                </div>
                <div className="notesArea">
                    <textarea placeholder="Notes here..." >{notes}</textarea>
                    <button onClick={handleSaveButton}>Save</button>
                </div>
            </div>
            
        </>
    );

}
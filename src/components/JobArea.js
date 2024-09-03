import { ref, remove, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import auth, { database } from "../firebaseSetup";
import editIcon from "./edit.png"
export default function JobArea({jobTitle, status, notes, jobID, handleDelete}) {
    const [notesAreaHeight, setNotesAreaHeight] = useState('10vh');
    const [applicationStatus, setApplicationStatus] = useState("default");
    const [appStatusStyles, setAppStatusStyles] = useState({});
    const notesTextareaRef = useRef(null);

    const toggleNotesAreaHeight = () => {
        setNotesAreaHeight(notesAreaHeight === '10vh' ? '30vh' : '10vh');
    };

    
  const toggleApplicationStatus = (newStatus) => {
    setApplicationStatus(newStatus);
    switch (newStatus) {
      case "green":
        setAppStatusStyles({ backgroundColor: "#29c702", color: "white" });
        break;
      case "red":
        setAppStatusStyles({ backgroundColor: "#bd4057", color: "white" });
        break;
      case "yellow":
        setAppStatusStyles({ backgroundColor: "#baa716", color: "white" });
        break;
      case "default":
        setAppStatusStyles({ backgroundColor: "#110f12", color: "white" });
        break;
    }
    uploadStatus(newStatus);
  };

  const handleDeleteButton = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
        handleDelete(jobID);
    }
  };

    useEffect(() => {
        toggleApplicationStatus(status);
    }, [status]);

    useEffect(() => {
        notesTextareaRef.current.value = notes;
    
        notesTextareaRef.current.addEventListener('input', (event) => {
          const newNotes = event.target.value;
          set(ref(database, 'users/' + auth.currentUser.uid + '/jobs/' + jobID + "/notes"), newNotes);
        });
      }, [notes, jobID]);
    


    // const handleSaveButton = () => {
    //     const textareaValue = document.querySelector('.notesArea textarea').value;
    //     set(ref(database, 'users/' + auth.currentUser.uid + '/jobs/' + jobID + "/notes"), textareaValue)
    // }

    const uploadStatus = (newStatus) => {
        set(ref(database, 'users/' + auth.currentUser.uid + '/jobs/' + jobID + "/status"), newStatus)
    }

    return (
        <>
            <div className="jobArea" style={{height: notesAreaHeight, ...appStatusStyles}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"} }>
                    <h2>{jobTitle}</h2>
                    <button onClick={toggleNotesAreaHeight}><img src = {editIcon} alt="Edit Notes"></img></button>
                    <button onClick={() => toggleApplicationStatus("green")}>Checkmark</button>
                    <button onClick={() => toggleApplicationStatus("yellow")}>Interviewing</button>
                    <button onClick={() => toggleApplicationStatus("red")}>X</button>
                    <button onClick={handleDeleteButton}>Delete Application</button>
                </div>
                <div className="notesArea">
                    <textarea ref = {notesTextareaRef} placeholder="Notes here..."></textarea>
                    {/*<button onClick={handleSaveButton}>Save</button>*/}
                </div>
            </div>
            
        </>
    );

}
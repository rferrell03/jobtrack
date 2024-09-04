import { ref, remove, set } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import auth, { database } from "../firebaseSetup";
import editIcon from "./edit.png"
import checkIcon from "./check.png"
import interviewIcon from "./megaphone.png"
import trashIcon from "./trash-xmark.png"
import crossIcon from "./cross.png"
export default function JobArea({jobTitle, status, notes, jobID, handleDelete}) {
    const [notesAreaHeight, setNotesAreaHeight] = useState('10vh');
    const [applicationStatus, setApplicationStatus] = useState("default");
    const [appStatusStyles, setAppStatusStyles] = useState({});
    const [iconStyle, setIconStyle] = useState({});
    const notesTextareaRef = useRef(null);

    const toggleNotesAreaHeight = () => {
        setNotesAreaHeight(notesAreaHeight === '10vh' ? '30vh' : '10vh');
  };
  

    
  const toggleApplicationStatus = (newStatus) => {
    setApplicationStatus(newStatus);
    switch (newStatus) {
      case "green":
        setAppStatusStyles({ backgroundColor: "#29c702", color: "white"});
        setIconStyle({});
        break;
      case "red":
        setAppStatusStyles({ backgroundColor: "#bd4057", color: "white" });
        setIconStyle({});
        break;
      case "yellow":
        setAppStatusStyles({ backgroundColor: "#baa716", color: "white" });
        setIconStyle({});
        break;
      case "default":
        setAppStatusStyles({ backgroundColor: "#110f12", color: "white" });
        setIconStyle({ filter: "invert(100%) sepia(100%) saturate(17%) hue-rotate(215deg) brightness(105%) contrast(100%)" })
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
                    <img style={{...iconStyle}} onClick={toggleNotesAreaHeight} src = {editIcon} alt="Edit Notes"></img>
                    <img style={{...iconStyle}} onClick={() => toggleApplicationStatus("green")} src = {checkIcon} alt="Offer"></img>
                    <img style={{...iconStyle}} onClick={() => toggleApplicationStatus("yellow")} src = {interviewIcon} alt="Interview"></img>
                    <img style={{...iconStyle}} onClick={() => toggleApplicationStatus("red")} src = {crossIcon} alt="Interview"></img>
                    <img style={{...iconStyle}} onClick={handleDeleteButton} src = {trashIcon} alt="Delete Application"></img>
                </div>
                <div className="notesArea">
                    <textarea ref = {notesTextareaRef} placeholder="Notes here..."></textarea>
                    {/*<button onClick={handleSaveButton}>Save</button>*/}
                </div>
            </div>
            
        </>
    );

}
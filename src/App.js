import './App.css';
import JobArea from './components/JobArea';
import AddJobScreen from './components/AddJobScreen';
import { sampleJobs } from './jobs';
import { useState, useEffect } from 'react';
import auth, { database } from "./firebaseSetup"
import { onAuthStateChanged } from 'firebase/auth';
import LogIn from './components/LogIn';
import { onChildAdded, onValue, ref, remove } from 'firebase/database';

function App() {
  const [addJobOpen, setAddJobOpen] = useState(false)
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  //listens to the database for new job additions 
  useEffect(() => {
    if (user) {
      const dbRef = ref(database, 'users/' + user.uid + "/jobs");
      const unsubscribe = onChildAdded(dbRef, (snapshot) => { // Use onChildAdded
        const newJob = snapshot.val(); // Get the new job data
        setJobs((prevJobs) => [...prevJobs, newJob]); // Update jobs state
      });

      return () => unsubscribe();
    }
  }, [user]);

  //Changes state when user logs in / out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })

    return () => unsubscribe();
  }, [auth])
  
  const handleJobAddClick = () => {
    setAddJobOpen(true)
  }
  const handleJobAddClose = () => {
    setAddJobOpen(false)
  }

  const handleJobDelete = (jobID) => {
    remove(ref(database, 'users/' + user.uid + "/jobs/" + jobID))
      .then(() => {
        setJobs(prevJobs => prevJobs.filter(job => job.jobID !== jobID));
        console.log("Job deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
      });
  };

   const handleLogOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        setJobs([]);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <>
      {user ? (<>
        <div className="centerBox">
          <div className="header">
            <h1>JobTracker</h1>
            <button onClick={handleJobAddClick}>+</button>
            <button onClick = {handleLogOut}>Log out</button>
          </div>

          <div className='jobs'>
            {jobs.map((job) => {
              return <JobArea {...job} handleDelete={handleJobDelete} />
            })}
          </div>
        </div>
        {addJobOpen && <AddJobScreen closeAddJob={handleJobAddClose} />}

      </>
      ) : (
        <LogIn />
      )}
    </>
  );
}

export default App;

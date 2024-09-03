import './App.css';
import JobArea from './components/JobArea';
import AddJobScreen from './components/AddJobScreen';
import { sampleJobs } from './jobs';
import { useState, useEffect } from 'react';
import auth, { database } from "./firebaseSetup"
import { onAuthStateChanged } from 'firebase/auth';
import LogIn from './components/LogIn';
import { onChildAdded, onValue, ref } from 'firebase/database';

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


  return (
    <>
      {user ? (<>
        <div className="centerBox">
          <div className="header">
            <h1>JobTracker</h1>
            <button onClick={handleJobAddClick}>+</button>
          </div>

          <div className='jobs'>
            {jobs.map((job) => {
              return <JobArea {...job} />
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

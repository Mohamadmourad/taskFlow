import { useLocation } from 'react-router-dom';
import TaskBox from '../components/TaskBox';
import LogoutBtn from '../components/LogoutBtn';
import { useEffect, useState } from 'react';
import reset from '../functions/reset';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const HomePage = () => {
  let data = useLocation();
  let tasks= data.state[0];
  let user = data.state[1];

  const [level,setLevel] = useState(user.level);
  const [exp,setExp] = useState(user.exp);
  const [percentage,setPersentage] = useState("0%");

  const [admin,setAdmin] = useState(false);

  const checkAdmin = async()=>{
    let adminCollection = collection(db,"admin");
    let q = query(adminCollection,where("userId","==",user.userId));
    let adminSnapshot = await getDocs(q);
    let count = 0;
    adminSnapshot.forEach((doc)=>{
      count++;
    });
    if(count>0){
      setAdmin(true);
    }
  }

  useEffect(()=>{
    checkAdmin();
  },[level,exp,percentage])

    return (
        <div className="HomePage text-light">
          <LogoutBtn />
          <h2 className='m-5'>Your daily tasks: </h2>
          <aside className='taskArea d-flex flex-column align-items-center gap-4'>
          {
            tasks.map(task =>(
              <TaskBox
               key={task.taskId}
                name={task.name} 
                state={task.status}
                userId = {task.userId}
                taskId = {task.taskId}
                />
            ))
          }
          </aside>
          {/* <h2 className='m-5'>Your progress: </h2>
          <aside className='userArea d-flex align-items-center flex-column'>
            <div className="progress">
               <div className="progress-bar bg-success" role="progressbar" style={{ width: percentage }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
             </div>
             <div className="level d-flex justify-content-start align-items-center mt-5">
                 <h4>Level :  {level}</h4>
             </div>
          </aside> */}
          <aside className='d-flex flex-column align-items-center gap-3 my-5'>
            <h4>admin dashbord: </h4>
            {admin ? <button onClick={()=>{reset()}} className='btn btn-danger'>Reset</button> : <h5 className='text-danger'>You dont have access</h5>
            }
          </aside>
        </div>
    );
}
 
export default HomePage;
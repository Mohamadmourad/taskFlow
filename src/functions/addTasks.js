import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const addTasks = async(userId,tasks)=>{
  let c = collection(db,"dailyUser");
  let res = [];
  tasks.forEach(async (task)=>{
    await addDoc(c,{
        name : task.name,
        taskId : task.taskId,
        status : false,
        userId : userId
    })
    res.push({
        name : task.name,
        taskId : task.taskId,
        status : false,
        userId : userId
    })
  })

  return res;
}

export default addTasks;
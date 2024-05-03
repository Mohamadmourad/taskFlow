import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const getDailyTasks = async()=>{
  let tasks = [];
  let c = collection(db,"dailyTasks");
  let data = await getDocs(c);

   data.forEach((doc) =>{
    tasks.push({
      name : doc.data().name,
      taskId : doc.data().taskId
    })
  })

  return tasks;
}

export default getDailyTasks;
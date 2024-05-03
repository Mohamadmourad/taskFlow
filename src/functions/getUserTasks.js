import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

const getUserTasks = async(userId,tasks)=>{
    let c = collection(db,"dailyUser");
    let res = [];

    tasks.forEach(async(task)=>{
        let q = query(c,where("userId","==",userId),where("taskId","==",task.taskId));
        let data = await getDocs(q);

        data.forEach(doc=>{
            res.push(doc.data());
        })
    })

   return res;
}

export default getUserTasks;
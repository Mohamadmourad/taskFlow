import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

const checkTask = async (userId,taskId)=>{
  let c = collection(db,"dailyUser");
  let q = query(c,where("userId","==",userId),where("taskId","==",taskId));
  let count = 0;
  
  let data = await getDocs(q);

  data.forEach(d=>{
    count++;
  })
  if(count > 0)return true;
  return false;
}

export default checkTask;
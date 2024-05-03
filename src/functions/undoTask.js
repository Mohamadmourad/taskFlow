import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

const undoTask = async(userId, taskId)=>{
    try {
        let c = collection(db, 'dailyUser');
        let q = query(c, where('userId', '==', userId));
        let tasks = await getDocs(q);
    
        await Promise.all(tasks.docs.map(async (task) => {
          if (task.data().taskId == taskId) {
            await updateDoc(task.ref, { status: false });
          }
        }));
      } catch (e) {
        console.log(e);
      }
}

export default undoTask;
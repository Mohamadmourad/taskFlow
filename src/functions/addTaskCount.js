import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";

const addTaskCount = async(userId)=>{
    let userCollection = collection(db,"user");
    let q = query(userCollection,where("userId","==",userId));
    let userSnapshot = await getDocs(q);

    userSnapshot.forEach(async(doc)=>{
        let count = doc.data().taskCompleted;
        count++;
        await updateDoc(doc.ref,{taskCompleted: count});
    });
    
}

export default addTaskCount;
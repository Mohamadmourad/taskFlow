import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const reset = async ()=>{
 let userCollection = collection(db,"dailyUser");
 let dailyTaksCollection = collection(db,"dailyTasks");

 let userSnapshot = await getDocs(userCollection);
 let dailyTaskSnapshot = await getDocs(dailyTaksCollection);

 userSnapshot.forEach(async(doc)=>{
    await deleteDoc(doc.ref);
 });

 dailyTaskSnapshot.forEach(async(doc)=>{
    await deleteDoc(doc.ref);
 });

 let taskCollection = collection(db,"tasks");
 let tasks = [];

 let taskSnapshot = await getDocs(taskCollection);
    taskSnapshot.forEach((doc)=>{
        tasks.push(doc.data());
    });

  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * tasks.length);
    let task = tasks[randomIndex];
    await addDoc(dailyTaksCollection, task);
    tasks.splice(randomIndex, 1);
}

}

export default reset;
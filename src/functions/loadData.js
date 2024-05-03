import { auth } from "../config/firebase";
import ReactLoading from 'react-loading';
import getDailyTasks from "./getDailyTasks";
import checkTask from "./checkTask";
import getUserTasks from "./getUserTasks";
import addTasks from "./addTasks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const loadData = async (id)=>{
    let info = [];
    let tasks= [];
  
    let userCollection = collection(db, "user");
    let q = query(userCollection, where("userId", "==", id));

    let data = await getDocs(q);

    data.forEach((user) => {
      info = user.data();
    });

    let dailyTasks = await getDailyTasks();

    let found = await checkTask(id, dailyTasks[0].taskId);

    if (found) {
      tasks = await getUserTasks(id, dailyTasks); 
    } else {
      tasks = await addTasks(id, dailyTasks); 
    }

    return [tasks,info];
}

export default loadData;
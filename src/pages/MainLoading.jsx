import ReactLoading from 'react-loading';
import getDailyTasks from "../functions/getDailyTasks";
import checkTask from "../functions/checkTask";
import getUserTasks from "../functions/getUserTasks";
import addTasks from "../functions/addTasks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import loadData from '../functions/loadData';

const MainLoading = () => {
  const [info, setInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      setTasks(await loadData(id));
      setIsLoading(false);
    };
    getInfo();

    if (!isLoading) {
      setTimeout(() => {
          navigate('/HomePage/' + id, { state: tasks });
      }, 600);
    }
  }, [isLoading]);

  return (
    <div className="MainLoading">
        <div className="Loading d-flex justify-content-center align-items-center">
          <ReactLoading type={"bars"} color={"white"} height={250} width={150} />
        </div>
    </div>
  );
};

export default MainLoading;


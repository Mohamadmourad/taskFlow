import { useState } from "react";
import completeTask from "../functions/completeTask";
import undoTask from "../functions/undoTask";
import addTaskCount from "../functions/addTaskCount";
import removeTaskCount from "../functions/removeTaskCount";

const TaskBox = ({name,state,userId,taskId}) => {
  const [currentState,setCurrentState] = useState(state);

  const click = async ()=>{
   setCurrentState(!currentState);
    if(!currentState){
      await completeTask(userId,taskId);
      await addTaskCount(userId);
    }

    else{
      await undoTask(userId,taskId);
      await removeTaskCount(userId);
    }
  }
    return (
        <div className="TaskBox bg-dark rounded-3">
          <aside className="p-3 gap-3 d-flex align-items-center">
            <div className="">
                <input checked={currentState} type="checkbox" className="form-check-input" onChange={()=>{click()}}></input>
            </div>
            <div className="text-light">
                {name}
            </div>
          </aside>
        </div>
    );
}
 
export default TaskBox;
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";


const LogoutBtn = () => {
    let navigate = useNavigate();
    return (
        <button
         className="btn btn-danger logout"
         onClick={async()=>{
          await signOut(auth);
          navigate('/login');
         }}
         >
            Logout
         </button>
    );
}
 
export default LogoutBtn;
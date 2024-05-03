import { useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const signUp = async () => {
    try {
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const pass = passRef.current.value;

      await createUserWithEmailAndPassword(auth, email, pass);

      let userCollection = collection(db, "user");
      await addDoc(userCollection, {
        username: username,
        taskCompleted: 0,
        userId: auth.currentUser.uid
      });

      navigate(`/loading/${auth.currentUser.uid}`);
      
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/weak-password':
          setPasswordError('The password is too weak.');
          break;
        case 'auth/email-already-in-use':
          setEmailError('The email address is already in use.');
          break;
        default:
          console.error(error);
          break;
      }
    }
  };

  return (
    <div className="SignUp form">
      <div className="row d-md-flex">
        <h2 className="col-12 d-flex justify-content-center text-light mt-2">Signup</h2>
        <aside className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <i className="bi bi-shield-lock-fill"></i>
        </aside>
        <aside className="col-12 col-md-6">
          <form>
            <div className="form-group">
              <label className="text-light mb-1">Username</label>
              <input type="text" className="form-control" placeholder="Username" ref={usernameRef} onChange={() => { setUsernameError('') }} />
              <small className="form-text text-danger">{usernameError}</small>
            </div>
            <div className="form-group">
              <label className="text-light mb-1">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} onChange={() => { setEmailError('') }} />
              <small className="form-text text-danger">{emailError}</small>
            </div>
            <div className="form-group">
              <label className="text-light mb-1">Password</label>
              <input type="password" className="form-control" placeholder="Password" ref={passRef} onChange={() => { setPasswordError('') }} />
              <small className="form-text text-danger">{passwordError}</small>
            </div>
            <div className="buttons d-flex justify-content-between">
              <button type="button" className="btn btn-primary btn-lg" onClick={signUp}>SignUp</button>
              <Link to="/login" className="btn btn-info text-light btn-lg">Login</Link>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default SignUp;


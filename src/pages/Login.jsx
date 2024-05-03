import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const login = async () => {
        const email = emailRef.current.value;
        const pass = passRef.current.value;

        try {
            await signInWithEmailAndPassword(auth, email, pass);
            navigate(`/loading/${auth.currentUser.uid}`);
        } catch (error) {
            const errorCode = error.code;
            switch (errorCode) {
                case 'auth/user-not-found':
                    setError('Invalid Email or Password');
                    break;
                case 'auth/wrong-password':
                    setError('Invalid Email or Password');
                    break;
                default:
                    setError('Invalid Email or Password');
                    console.error(error);
                    break;
            }
        }
    }

    return (
        <div className="Login form">
            <div className="row d-md-flex">
                <h2 className="col-12 d-flex justify-content-center text-light mt-2">Login</h2>
                <aside className="col-12 col-md-6">
                    <i className="bi bi-shield-lock"></i>
                </aside>
                <aside className="col-12 col-md-6">
                    <form>
                        <div className="form-group">
                            <label className="text-light mb-1">Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} onChange={() => { setError('') }} />
                            <small className="form-text text-danger">{error}</small>
                        </div>
                        <div className="form-group">
                            <label className="text-light mb-1">Password</label>
                            <input type="password" className="form-control" placeholder="Password" ref={passRef} onChange={() => { setError('') }} />
                        </div>
                        <div className="buttons d-flex justify-content-between mt-3">
                            <button type="button" className="btn btn-primary btn-lg" onClick={login}>Login</button>
                            <Link to="/signUp" className="btn btn-info text-light btn-lg">SignUp</Link>
                        </div>
                    </form>
                </aside>
            </div>
        </div>
    );
}

export default Login;

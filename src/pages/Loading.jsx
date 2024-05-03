import ReactLoading from 'react-loading';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const onAuthStateChanged = (user) => {
    if (user) {
      setUserId(user.uid);
      navigate(`/loading/${user.uid}`);
    } else {
      setUserId(null);
      navigate(`/signUp`);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <div className="Loading d-flex justify-content-center align-items-center">
      <ReactLoading type={"bars"} color={"white"} height={250} width={150} />
    </div>
  );
};

export default Loading;

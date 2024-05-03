import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import HomePage from './pages/HomePage.jsx'
import Loading from "./pages/Loading.jsx";
import SignUp from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import MainLoading from "./pages/MainLoading.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element = {<Loading />}/>
        <Route path="/HomePage">
          <Route path=":id" element={<HomePage />}/>
        </Route>
      <Route path="/signUp" element = {<SignUp /> }/>
      <Route path="/login" element = {<Login /> }/>
      <Route path="/loading" >
         <Route path=":id" element={<MainLoading />}/>
      </Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

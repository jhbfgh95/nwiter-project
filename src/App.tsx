import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layouts from "./components/layouts";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

//Layout을 감싸버리면 children으로 home, profile 컴포넌트가 있기 때문에 굳이 따로따로 감싸지 않고 Layout만 감싸도 된다.
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layouts />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create_account",
    element: <CreateAccount />,
  },
]);

const GlobalSytles = createGlobalStyle`
      ${reset}; 
      *{
        box-sizing:border-box;
      }
      body{ 
        background-color: black; 
        color:white; 
        font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
      }`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); //firebase가 실행 되는 부분(auth부분이 실행됨)
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Wrapper>
        <GlobalSytles />{" "}
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Wrapper>
    </>
  );
}

export default App;

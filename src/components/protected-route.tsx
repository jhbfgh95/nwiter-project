import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

//children, reactNode 알아보기! children prop은 component로 가둬놓은 모든 것이다. 쓸 때는 보통 위처럼 쓴다/
//센세의 설명으로는 이 component안에 App에서 가둬놓은 Home, Profile 두 컴포넌트들이 children으로써 들어온다.
//결국은 return <Home/> <Profile/>이 되는 것이다.
//이때 user가 login을 한것을 체크하는게 if 구문임.
//이친구의 존재 이유는 Home 화면을 Login한 사람만 접속할 수 있게 해주는 거임 그걸 가능하게 하는게 if문이랑 children으로 App에서 감싸는 작업인거
//currentUser은 현재 로그인한 user임 그러니까 당신이다. 현재 로그인해 있는 당신 하나를 지칭하는 거

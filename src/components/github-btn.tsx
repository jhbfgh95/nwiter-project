import styled from "styled-components";
import { auth } from "../firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  color: black;
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const Logo = styled.img``;

export default function GithubButton() {
  const navigate = useNavigate();
  const onclick = async () => {
    const Provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, Provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={onclick}>
      <Logo src="/github.svg" />
    </Button>
  );
}
//보면서 생각한건데 firebase 명령어들은 어떻게 쓰는지 알아야할거같음 그냥 알려주는대로 따라가는것만이 아니라
//예를 들면 email, password는 provider가 필요하지 않고 직접 입력받은 것을 써야하는데
//Github는 provider가 필요한것
//signtinwithpopup도 그럼 두가지 방법있는데 이것도 다 문서가면 나올거아님

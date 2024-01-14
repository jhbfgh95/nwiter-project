import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

const errors = {
  "Firebase: Error (auth/invalid-email).": "That Email is invaild",
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (name === "" || password === "" || email === "" || isLoading) return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Pwitter</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="E-mail"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          value={isLoading ? "Loading..." : "Create Account"}
          type="submit"
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}

//name은 input tag에용 react에서 쓰는 태그
//무조건 이부분은 한 번 더 들어야함
// 왜 why 1. onChange 모름 2. e: React.ChangeEvent<HTMLInputElement> 이구문도 모름 3. target = {name, value} 요거도 4. 각 input에 넣어둔 name이 어떻게 if ~else 구문에서 작용하는지 확실히 알아야함
//try catch도 다시 복습해야함
//firebass의 createuserwithemailandpassword 함수에서는 계정을 만들 때 name이 필요하지 않지만 사용자 프로필에 업데이트 하기위해
//updatprofie로 name state에 입력한걸 넣어준다
//useNavigate hoook 알아보기 await도 심층 연구 하기 instanceof도ㅓ 알아보기
//Error 가지고 올때는 firebase 클릭해서 뭐뭐 있는지 알고 console.log찍어 봤다. 이런식으로 뭐가 있는지 알아야 할듯
//에러 나는 친구들 한번 싹다 흝어본다음에 친근한 에러 경고 메세지로 바꿔보기

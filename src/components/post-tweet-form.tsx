import { useState } from "react";
import styled from "styled-components";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, database, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  font-weight: 700;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    text-align: center;
  }
  &:focus {
    outline: none;
    border-color: #159bf0;
  }
`;

const AttachFileBtn = styled.label`
  padding: 10px 0px;
  color: #159bf0;
  text-align: center;
  border: 2px solid #159bf0;
  font-size: 17px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #159bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onfilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxSize = 1024 * 1024 * 1024;
    if (files && files.length === 1 && files[0].size < maxSize) {
      return setFile(files[0]);
    }
  };
  //이 밑으로 1/8일자 공부내용임
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(database, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "O.O",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        onChange={onchange}
        value={tweet}
        placeholder="What is happening?!"
        spellCheck="false"
        required
      ></TextArea>
      <AttachFileBtn htmlFor="file">
        {file ? "Photo added" : "Add Photo"}
      </AttachFileBtn>
      <AttachFileInput
        onChange={onfilechange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}

//어떤 input은 여러개의 파일도 넣을 수 있지만 여기선 하나만 넣고 싶기 때문에 onflielchange에서 if문을 사용해서 하나만 올릴 수 있게 해준다

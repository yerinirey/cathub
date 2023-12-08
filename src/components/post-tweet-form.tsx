import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  position: fixed;
  width: 40vw;
  height: 540px;
  background-color: #23292e;
  border-radius: 18px;
`;

const Name = styled.div`
  font-size: 20px;
  width: 94%;
  font-weight: 600;
`;
const TextArea = styled.textarea`
  margin-top: 20px;
  border: 2px solid white;
  padding: 20px;
  border-radius: 4px 4px 18px 18px;
  font-size: 16px;
  color: white;
  background-color: #141414;
  width: 94%;
  height: 370px;
  resize: none;
  outline: none;
  border: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 94%;
  justify-content: space-between;
`;

const AttachFileButton = styled.label`
  background-color: #5856d6;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 18px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #83ab5d;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 18px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
const FormHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 94%;
`;

const CloseButton = styled.div`
  width: 28px;
  height: 28px;
  background-color: #141414;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;

export default function PostTweetForm({ onCloseModal }: any) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const user = auth.currentUser;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1024 * 1024 * 3) {
        return alert("Please choose a file smaller than 3MB.");
      }
      setFile(files[0]);
    }
  };
  const onClose = () => {
    if (tweet !== "" || file !== null) {
      const ok = confirm("Are you sure you want to close the form?");
      if (ok) onCloseModal();
      else return;
    }
    onCloseModal();
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onCloseModal();
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <FormHead>
        <Name>{user?.displayName ? user.displayName : "Annonymous"}</Name>
        <CloseButton onClick={onClose}>✖</CloseButton>
      </FormHead>

      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
      />
      <BtnWrapper>
        <AttachFileButton htmlFor="file">
          {file ? "Photo added" : "Add Photo"}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitBtn type="submit" value={isLoading ? "Loading ..." : "Post"} />
      </BtnWrapper>
    </Form>
  );
}

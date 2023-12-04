import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: darkgrey;
  color: white;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  margin: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(`${tweet}`);
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const onChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onEdit = async () => {
    if (user?.uid !== userId && text === "") return;
    try {
      if (isEdit) {
        await updateDoc(doc(db, "tweets", id), { tweet: text });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsEdit(!isEdit);
    }
  };

  const onCancel = async () => {
    setText(`${tweet}`);
    if (isEdit === true) setIsEdit(!isEdit);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEdit ? (
          <TextArea
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={text}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <BtnWrapper>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={onEdit}>
              {isEdit ? "Submit" : "Edit"}
            </EditButton>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </BtnWrapper>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo}></Photo> : null}</Column>
    </Wrapper>
  );
}

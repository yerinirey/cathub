import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import Reactions from "./reaction";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #0e1117;
  border-radius: 14px;
`;

const Column = styled.div``;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  display: inline-block;
  padding: 10px 0;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  margin-top: 10px;
`;

const Payload = styled.div`
  margin: 10px 0px;
  font-size: 18px;
  background-color: #23292e;
  min-height: 100px;
  border-radius: 6px 6px 14px 14px;
  padding: 10px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const DeleteButton = styled.button`
  background-color: #be5858;
  color: white;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const EditButton = styled.button`
  background-color: #83ab5d;
  color: white;
  font-weight: 600;
  font-size: 12px;
  border: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const TextArea = styled.textarea`
  margin: 10px 0px;
  font-size: 18px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #353e46;
  color: white;
  min-height: 100px;
  border-radius: 6px 6px 14px 14px;
  padding: 10px;
  width: 100%;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
        <UserBox>
          <Username>{username}</Username>
          {user?.uid === userId ? (
            <BtnWrapper>
              <DeleteButton onClick={onDelete}>Delete</DeleteButton>
              <EditButton onClick={onEdit}>
                {isEdit ? "Submit" : "Edit"}
              </EditButton>
              {isEdit ? (
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
              ) : null}
            </BtnWrapper>
          ) : null}
        </UserBox>
        {isEdit ? (
          <TextArea
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={text}
          />
        ) : (
          <Payload>
            {tweet}
            <Column>{photo ? <Photo src={photo}></Photo> : null}</Column>
          </Payload>
        )}
        <Reactions />
      </Column>
    </Wrapper>
  );
}

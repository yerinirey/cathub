import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useState } from "react";

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

const Reaction = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;

  height: 32px;
  margin-bottom: -8px;
  padding-top: 4px;
`;

const ReactItem = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  svg {
    display: block;
    &:hover {
      cursor: pointer;
    }
  }

  &.comment {
    color: steelblue;
  }
  &.retweet {
    color: violet;
  }
  &.heart {
    color: pink;
  }
  &.share {
    color: green;
  }
  &.toggle {
    color: rgba(255, 255, 255, 0.8);
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

  const onReact = (event: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = event;
    currentTarget.classList.contains("toggle")
      ? currentTarget.classList.remove("toggle")
      : currentTarget.classList.add("toggle");
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
        <Reaction>
          <ReactItem onClick={onReact} className="comment toggle">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            {Math.floor(Math.random() * 1000 - 400) + 400}
          </ReactItem>
          <ReactItem onClick={onReact} className="retweet toggle">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
            {Math.floor(Math.random() * 1000 - 400) + 400}
          </ReactItem>
          <ReactItem onClick={onReact} className="heart toggle">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            {Math.floor(Math.random() * 1000 - 400) + 400}
          </ReactItem>
          <ReactItem onClick={onReact} className="share toggle">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </ReactItem>
        </Reaction>
      </Column>
    </Wrapper>
  );
}

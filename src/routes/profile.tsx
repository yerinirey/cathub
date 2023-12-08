import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

const Wrapper = styled.div`
  margin-top: 40px;
  width: 35vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const AvatarUpload = styled.label`
  width: 100px;
  overflow: hidden;
  height: 100px;
  border-radius: 50%;
  background-color: #5856d6;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;

const Category = styled.div`
  width: 100%;
  height: 60px;
  background-color: #0e1117;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 4px 4px 18px 18px;
`;

const CategoryItem = styled.div`
  width: 25%;
  height: 100%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid white;
  &.location {
    border-bottom: 2px solid #6c8c4f;
    color: #6c8c4f;
    font-weight: 600;
  }
  cursor: pointer;
`;

const Tweets = styled.div`
  display: flex;
  width: 35vw;
  flex-direction: column;
  gap: 10px;
  height: 68vh;
  overflow: scroll;
  &.hidden {
    display: none;
  }
`;

const Container = styled.div`
  width: 35vw;
  height: 400px;
  background-color: #0e1117;
  border-radius: 4px 4px 18px 18px;
  &.hidden {
    display: none;
  }
  padding: 20px;
  font-size: 20px;
`;

const NameInput = styled.input`
  background-color: #0e1117;
  color: white;
  text-align: center;
  border-radius: 25px;
  border: none;
  font-size: 22px;
  padding: 4px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
  }
`;

const Rename = styled.button`
  padding: 4px 8px;
  font-weight: 500;
  background-color: #5856d6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [index, setIndex] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user?.displayName ?? "Anonymous");

  const onRenameClick = async () => {
    if (!user) return;
    setIsEdit((p) => !p);
    if (!isEdit) return;
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsEdit(false);
    }
  };
  const onRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, { photoURL: avatarUrl });
    }
  };

  const onClick = (
    e: React.MouseEvent<HTMLDivElement>,
    currentIndex: number
  ) => {
    const { currentTarget } = e;
    if (currentIndex !== index) setIndex(currentIndex);
    document.querySelectorAll(".item").forEach((item) => {
      if (item !== currentTarget && item.classList.contains("location")) {
        item.classList.remove("location");
      }
    });
    currentTarget.classList.add("location");
  };
  const fetchWTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchWTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      {isEdit ? (
        <NameInput required onChange={onRename} type="text" value={name} />
      ) : (
        <Name>{name ? name : "Annonymous"}</Name>
      )}
      <Rename onClick={onRenameClick}>{isEdit ? "Save" : "Rename"}</Rename>
      <Category>
        <CategoryItem className="item" onClick={(e) => onClick(e, 0)}>
          Posts
        </CategoryItem>
        <CategoryItem className="item" onClick={(e) => onClick(e, 1)}>
          Followers
        </CategoryItem>
        <CategoryItem className="item" onClick={(e) => onClick(e, 2)}>
          Following
        </CategoryItem>
        <CategoryItem className="item" onClick={(e) => onClick(e, 3)}>
          Settings
        </CategoryItem>
      </Category>
      <Tweets className={index === 0 ? "" : "hidden"}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
      <Container className={index === 1 ? "" : "hidden"}>
        You can see Followers Here.
      </Container>
      <Container className={index === 2 ? "" : "hidden"}>
        You can see Followings Here.
      </Container>
      <Container className={index === 3 ? "" : "hidden"}>
        You can see Settings Here.
      </Container>
    </Wrapper>
  );
}

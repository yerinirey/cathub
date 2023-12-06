import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  grid-template-rows: 1fr 5fr;
  width: 35vw;
  height: calc(100vh - 80px);
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const Head = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const Button = styled.div`
  width: 100px;
  height: 34px;
  border-radius: 14px;
  background-color: #6c8c4f;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.hidden {
    display: none;
  }
`;
const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const [modal, setModal] = useState(false);
  const onPost = () => {
    setModal(true);
  };

  const onCancel = () => {
    const ok = confirm("Close Form");
    if (ok) setModal(false);
  };

  return (
    <Wrapper>
      <HeadWrapper>
        <Head>HOMEow</Head>
        <Button onClick={onPost}>post</Button>
      </HeadWrapper>
      {modal ? (
        <Modal>
          <ModalOverlay onClick={onCancel}></ModalOverlay>
          <PostTweetForm />
        </Modal>
      ) : null}
      <Timeline />
    </Wrapper>
  );
}

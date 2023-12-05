import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100vw;
`;

export const LeftWrapper = styled.div`
  margin-left: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30vw;
  padding-bottom: 10vh;
  @media (max-width: 800px) {
    margin: auto;
    width: 70vw;
  }
`;

export const Title = styled.h1`
  font-size: 3vw;
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  margin-bottom: 12px;
  font-weight: 600;
  @media (max-width: 800px) {
    font-size: 7vw;
  }
`;

export const Subtitle = styled.h3`
  font-size: 1.4vw;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    font-size: 3vw;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
`;

export const Text = styled.span`
  font-weight: bolder;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 10px 10px;
  border-radius: 0.5rem;
  background-color: #181d21;
  color: white;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  height: 38px;
  &[type="submit"] {
    font-size: larger;
    font-weight: 700;
    margin-top: 30px;
    height: 48px;
    background-color: #83ab50;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  padding: 10px 10px;
  border-radius: 0.5rem;
  border: none;
  width: 100%;
  height: 48px;
  font-size: larger;
  font-weight: 700;
  text-align: center;
  color: black;
  background-color: grey;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ImageBox = styled.div`
  height: 100vh;
  width: 52vw;
  background-color: black;
  margin-left: auto;
  border-radius: 2.5rem 0 0 2.5rem;
  overflow: hidden;

  @media (max-width: 800px) {
    display: none;
  }
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

export const Logo = styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 28px;
  font-weight: 600;
`;

export const TopBar = styled.div`
  width: 100%;
  position: fixed;
  height: 70px;
  background-color: #181d21;
  border-bottom: 2px solid #24292e;
`;

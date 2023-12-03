import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.span`
  background-color: white;
  padding: 10px 20px;
  border-radius: 50px;
  width: 9vw;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 20vw;
  }
`;

const Logo = styled.img`
  height: 25px;
`;

export default function LoginMethod() {
  const github = new GithubAuthProvider();
  const google = new GoogleAuthProvider();
  const twitter = new TwitterAuthProvider();
  const navigate = useNavigate();

  const onClick = async (provider: AuthProvider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BtnWrapper>
      <Button onClick={() => onClick(github)}>
        <Logo src="/github-logo.svg" />
      </Button>
      <Button onClick={() => onClick(google)}>
        <Logo src="/google-logo.svg" />
      </Button>
      <Button onClick={() => onClick(twitter)}>
        <Logo src="/twitter-logo.svg" />
      </Button>
    </BtnWrapper>
  );
}

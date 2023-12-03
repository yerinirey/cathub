import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Form,
  ImageBox,
  Img,
  Input,
  LeftWrapper,
  Subtitle,
  Switcher,
  Text,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/login-method-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onCreateAccount = () => {
    navigate("/create-account");
  };
  return (
    <Wrapper>
      <LeftWrapper>
        <Title>How are You Today?</Title>
        <Subtitle>Sign in and See What is Happening</Subtitle>
        <GithubButton />
        <Form onSubmit={onSubmit}>
          <Text>Email</Text>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="email"
            type="email"
            required
          />
          <Text>Password</Text>
          <Input
            onChange={onChange}
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Meow!"} />
          {error !== "" ? <Error>{error}</Error> : null}
          <Switcher onClick={onCreateAccount}>Create Account</Switcher>
        </Form>
      </LeftWrapper>
      <ImageBox>
        <Img alt="src/image/Ggomi.jpg" src="src/image/Ggomi.jpg" />
      </ImageBox>
    </Wrapper>
  );
}

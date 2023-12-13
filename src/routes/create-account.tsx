import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  Form,
  ImageBox,
  Input,
  LeftWrapper,
  Switcher,
  Text,
  Title,
  Wrapper,
  Error,
  Img,
} from "../components/auth-components";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      // create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onLogIn = () => {
    navigate("/login");
  };
  return (
    <Wrapper>
      <LeftWrapper>
        <Title>Create Account</Title>
        <Form onSubmit={onSubmit}>
          <Text>Name</Text>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
          />
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
          <Input type="submit" value={isLoading ? "Loading..." : "Create"} />
          {error !== "" ? <Error>{error}</Error> : null}
          <Switcher onClick={onLogIn}>Already Have Account?</Switcher>
        </Form>
      </LeftWrapper>
      <ImageBox>
        <Img src="ggomi.png" />
      </ImageBox>
    </Wrapper>
  );
}

import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  height: 100%;
  margin-top: 70px;
  width: 100%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 18vw;
  background-color: #181d21;
  border-right: 2px solid #24292e;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 30px 10px;
  border-bottom: 2px solid #24292e;
  svg {
    width: 40px;
    fill: white;
  }
  &.log-out {
    svg {
      fill: tomato;
    }
  }
  h1 {
    color: white;
    font-weight: 500;
    font-size: 18px;
  }
`;

const Links = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const MenuName = styled.div`
  padding: 40px 0px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  border-bottom: 2px solid #24292e;
`;

const Right = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 30px;
`;

const Form = styled.div``;

const FormTitle = styled.div`
  font-size: 34px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Container = styled.div`
  background-color: #23292e;
  width: 90%;
  height: 80%;
  border-radius: 4px 4px 18px 18px;
  padding: 20px;
  gap: 10px;
  &.trend {
    height: 60%;
  }
`;
const TipHead = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #5856d6;
  margin-bottom: 20px;
`;
const TipText = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: #d1d2d3;
`;

const Trend = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  height: 100px;
  line-height: 1.5;
  &.more {
    float: right;
  }
`;
export const Toast = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  bottom: 20px;
  left: 20px;
  width: 220px;
  height: 60px;
  border-radius: 10px;
  background-color: #5856d6;
  &.hidden {
    display: none;
  }
  :first-child {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ToastText = styled.div``;

export default function Layout() {
  const keys = [
    "Po098TRdOn4",
    "agJ0CvXXNRo",
    "LDQhgqLwcRg",
    "5WqLjXTuvyU",
    "aSMVoKeEOsE",
    "XM1NTfC-f08",
    "wE8s993ZV-8",
  ];
  const key = keys[Math.floor(Math.random() * keys.length)];

  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const username = auth.currentUser?.displayName
    ? auth.currentUser?.displayName
    : "annonymous";
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      auth.signOut();
      navigate("/login");
    }
  };
  const onClick = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1500);
  };

  return (
    <Wrapper>
      <Toast className={toast ? "" : "hidden"}>
        <ToastText>Not Supported Yet!</ToastText>
      </Toast>
      <Menu>
        <MenuName>Hello, {username}!</MenuName>
        <Links to="/">
          <MenuItem>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              />
            </svg>
            <h1>Home</h1>
          </MenuItem>
        </Links>
        <Links to="/profile">
          <MenuItem>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
              />
            </svg>
            <h1>Profile</h1>
          </MenuItem>
        </Links>
        <MenuItem onClick={onClick}>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            />
          </svg>
          <h1>Explore</h1>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
            />
          </svg>
          <h1>Notice</h1>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
          </svg>
          <h1>Liked</h1>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
          </svg>
          <h1>More</h1>
        </MenuItem>
        <MenuItem onClick={onLogOut} className="log-out">
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            />
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
            />
          </svg>
          <h1>Log Out</h1>
        </MenuItem>
      </Menu>
      <Outlet />
      <Right>
        <Form>
          <FormTitle>Today's Video</FormTitle>
          <YouTube
            videoId={key}
            opts={{
              width: "90%",
              height: "300px",
              playerVars: {
                autoPlay: 1,
                rel: 0,
                modestbranding: 1,
              },
            }}
            onReady={(e) => {
              e.target.setVolume(10);
            }}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          ></YouTube>
        </Form>
        <Form>
          <FormTitle>Today's Tip</FormTitle>
          <Container>
            <TipHead>
              Cats Love Chur<TipText>tips tips tips</TipText>
            </TipHead>
            <TipHead>
              Cats Love Chur<TipText>tips tips tips</TipText>
            </TipHead>
            <TipHead>
              Cats Love Chur<TipText>tips tips tips</TipText>
            </TipHead>
            <TipHead>
              Cats Love Chur<TipText>tips tips tips</TipText>
            </TipHead>
          </Container>
        </Form>
        <Form>
          <FormTitle>Trend</FormTitle>
          <Container className="trend">
            <Trend>
              #tuxedo #sphinx #abyssinian #ragdoll #bengal #savannah
              #russianblue #FelisCatus
            </Trend>
            <Trend className="more">...and more!</Trend>
          </Container>
        </Form>
      </Right>
    </Wrapper>
  );
}

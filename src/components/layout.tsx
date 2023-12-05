import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 50px;
  height: 100%;
  margin: 70px 0px;
  width: 100%;
  border-top: 2px solid #24292e;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;
  width: 18vw;
  background-color: #181d21;
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
    width: 30px;
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
  padding: 30px 0px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 2px solid #24292e;
`;

const Right = styled.div`
  border: 1px solid blue;
  width: 20vw;
`;

export default function Layout() {
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
  return (
    <Wrapper>
      <Menu>
        <MenuName>Hello, {username}!</MenuName>
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
      <Right></Right>
    </Wrapper>
  );
}

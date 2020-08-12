import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { logoutUser } from "../../utils/auth";
export default function Header({ user }) {
  const [activeItem, setActiveItem] = useState("login");

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <Menu
      fluid
      color="teal"
      inverted
      style={{ borderRadius: 0, justifyContent: "flex-end" }}
    >
      {!user && (
        <Menu.Item
          header
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        >
          Login
        </Menu.Item>
      )}
      {user && (
        <Menu.Item as="p" style={{ margin: 0 }}>
          Welcome {user.name}
        </Menu.Item>
      )}
      {user && (
        <Menu.Item
          header
          name="logout"
          active={activeItem === "logout"}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      )}
    </Menu>
  );
}

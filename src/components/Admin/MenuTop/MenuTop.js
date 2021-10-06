import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

import ChrisLogo from "../../../assets/img/png/LogoChris.png";
import { logout } from "../../../api/auth";
import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className='menu-top'>
      <div className='menu-top__left'>
        <img
          className='menu-top__left-logo'
          src={ChrisLogo}
          alt='Christian Cervantes Tanta'
        ></img>
        <Button type='link' onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? (
            <MenuUnfoldOutlined></MenuUnfoldOutlined>
          ) : (
            <MenuFoldOutlined></MenuFoldOutlined>
          )}
        </Button>
      </div>
      <div className='menu-top__right'>
        <Button type='link' onClick={logoutUser}>
          <PoweroffOutlined></PoweroffOutlined>
        </Button>
      </div>
    </div>
  );
}

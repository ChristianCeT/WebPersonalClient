import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  MenuOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className='admin-sider' collapsed={menuCollapsed}>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key='/admin'>
          <Link to={"/admin"}>
            <HomeOutlined></HomeOutlined>
            <span className='nav-text'>Home</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='/admin/users'>
          <Link to={"/admin/users"}>
            <UserOutlined></UserOutlined>
            <span className='nav-text'>Usuarios</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='/admin/menu'>
          <Link to={"/admin/menu"}>
            <MenuOutlined></MenuOutlined>
            <span className='nav-text'>Menú</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='/admin/courses'>
          <Link to={"/admin/courses"}>
            <BookOutlined></BookOutlined>
            <span className='nav-text'>Cursos</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='/admin/blog'>
          <Link to={"/admin/blog"}>
            <MessageOutlined></MessageOutlined>
            <span className='nav-text'>Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);

import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  CheckOutlined,
  StopOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUserActive, setViewUserActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo usuario");
    setModalContent(
      <AddUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      ></AddUserForm>
    );
  };

  const showDeleteConfirm = (user) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando usuario",
      content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <div className='list-users'>
      <div className='list-users__header'>
        <div className='list-users__header-switch'>
          <Switch
            defaultChecked
            onChange={() => {
              setViewUserActive(!viewUserActive);
            }}
          ></Switch>
          <span>
            {viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
        <Button type='primary' onClick={addUserModal}>
          Nuevo usuario
        </Button>
      </div>

      {viewUserActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        ></UsersActive>
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        ></UsersInactive>
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalContent,
    setModalTitle,
    setReloadUsers,
    showDeleteConfirm,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      ></EditUserForm>
    );
  };

  return (
    <List
      className='users-active'
      itemLayout='horizontal'
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        ></UserActive>
      )}
    ></List>
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={() => editUser(user)}>
          <EditOutlined></EditOutlined>
        </Button>,

        <Button type='danger' onClick={desactivateUser}>
          <StopOutlined></StopOutlined>
        </Button>,

        <Button type='danger' onClick={(e) => showDeleteConfirm(user)}>
          <DeleteOutlined></DeleteOutlined>
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar}></Avatar>}
        title={`
            ${user.name ? user.name : "..."} 
            ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      ></List.Item.Meta>
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers, showDeleteConfirm } = props;
  return (
    <List
      className='users-active'
      itemLayout='horizontal'
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          showDeleteConfirm={showDeleteConfirm}
        ></UserInactive>
      )}
    ></List>
  );
}

function UserInactive(props) {
  const { user, setReloadUsers, showDeleteConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUser = () => {
    const accessToken = getAccessTokenApi();

    activateUserApi(accessToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={activateUser}>
          <CheckOutlined></CheckOutlined>
        </Button>,

        <Button type='danger' onClick={(e) => showDeleteConfirm(user)}>
          <DeleteOutlined></DeleteOutlined>
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar}></Avatar>}
        title={`
          ${user.name ? user.name : "..."} 
          ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      ></List.Item.Meta>
    </List.Item>
  );
}

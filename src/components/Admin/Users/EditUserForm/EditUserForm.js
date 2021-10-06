import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line
  }, [avatar]);

  const updateUser = () => {
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      return;
    }

    if (typeof userData.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadUsers(true);
      });
    }
  };

  return (
    <div className='edit-user-form'>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      ></EditForm>
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className='upload-avatar' {...getRootProps()}>
      <input {...getInputProps()}></input>
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar}></Avatar>
      ) : (
        <Avatar size={120} src={avatarUrl ? avatarUrl : NoAvatar}></Avatar>
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;
  return (
    <Form className='form-edit' onFinish={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined></UserOutlined>}
              placeholder='Nombre'
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined></UserOutlined>}
              placeholder='Apellidos'
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined></MailOutlined>}
              placeholder='Correo electrónico'
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Select
              placeholder='Selecciona un rol'
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value='admin'>Administrador</Option>
              <Option value='editor'>Editor</Option>
              <Option value='review'>Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined></LockOutlined>}
              type='password'
              placeholder='Contraseña'
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined></LockOutlined>}
              type='password'
              value={userData.repeatPassword}
              placeholder='Repetir contraseña'
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            ></Input>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          Actualizar usuario
        </Button>
      </Form.Item>
    </Form>
  );
}

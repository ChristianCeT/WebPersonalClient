import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker, notification } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostAPi, updatePostApi } from "../../../../api/post";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
  const { setIsVisibleModal, setReloadPosts, post } = props;
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (post) {
      setPostData(post);
    } else {
      setPostData({});
    }
  }, [post]);

  const processPost = () => {
    const { title, url, description, date } = postData;

    if (!title || !url || !description || !date) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else {
      if (!post) {
        addPost();
      } else {
        updatePost();
      }
    }
  };

  const addPost = () => {
    const token = getAccessTokenApi();
    addPostAPi(token, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  const updatePost = () => {
    const token = getAccessTokenApi();
    updatePostApi(token, post._id, postData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadPosts(true);
        setPostData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <div className='add-edit-post-form'>
      <AddEditForm
        postData={postData}
        setPostData={setPostData}
        post={post}
        processPost={processPost}
      ></AddEditForm>
    </div>
  );
}

function AddEditForm(props) {
  const { postData, setPostData, post, processPost } = props;

  return (
    <Form className='add-edit-post-form' onFinish={processPost}>
      <Row gutter={24}>
        <Col span={8}>
          <Input
            prefix={<FontSizeOutlined></FontSizeOutlined>}
            placeholder='Título'
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></Input>
        </Col>
        <Col span={8}>
          <Input
            prefix={<LinkOutlined></LinkOutlined>}
            placeholder='Url'
            value={postData.url}
            onChange={(e) =>
              setPostData({
                ...postData,
                url: trasnformTextUrl(e.target.value),
              })
            }
          ></Input>
        </Col>
        <Col span={8}>
          <DatePicker
            style={{ width: "100%" }}
            format='DD/MM/YYYY HH:mm:ss'
            placeholder='Fecha de publicación'
            value={postData.date && moment(postData.date)}
            onChange={(e, value) =>
              setPostData({
                ...postData,
                date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString(),
              })
            }
          ></DatePicker>
        </Col>
      </Row>

      <Editor
        value={postData.description ? postData.description : ""}
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],

          toolbar:
            // eslint-disable-next-line
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        onBlur={(e) =>
          setPostData({ ...postData, description: e.target.getContent() })
        }
      ></Editor>

      <Button type='primary' htmlType='submit' className='btn-submit'>
        {post ? "Actualizar post" : "Crear post"}
      </Button>
    </Form>
  );
}

function trasnformTextUrl(text) {
  const url = text.replace(" ", "-");
  return url.toLowerCase();
}

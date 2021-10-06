import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  DollarOutlined,
  GiftOutlined,
  KeyOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { addCourseAPi, updateCourseApi } from "../../../../api/course";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (course) {
      setCourseData(course);
    } else {
      setCourseData({});
    }
  }, [course]);

  const addCourse = () => {
    if (!courseData.idCourse) {
      notification["error"]({
        message: "El id del curso es obligatorio.",
      });
    } else {
      const accessToken = getAccessTokenApi();
      addCourseAPi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.message,
          });

          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor.",
          });
        });
    }
  };

  const updateCourse = () => {
    const accessToken = getAccessTokenApi();
    updateCourseApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <div className='add-edit-course-form'>
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        setCourseData={setCourseData}
        courseData={courseData}
      ></AddEditForm>
    </div>
  );
}

function AddEditForm(props) {
  const { course, addCourse, updateCourse, setCourseData, courseData } = props;
  return (
    <Form
      className='form-add-edit'
      onFinish={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined></KeyOutlined>}
          placeholder='ID DEL CURSO'
          value={courseData.idCourse}
          onChange={(e) =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
          disabled={course ? true : false}
        ></Input>
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<LinkOutlined></LinkOutlined>}
          placeholder='Url del curso'
          value={courseData.link}
          onChange={(e) =>
            setCourseData({ ...courseData, link: e.target.value })
          }
        ></Input>
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<GiftOutlined></GiftOutlined>}
          placeholder='Cupón de descuento'
          value={courseData.coupon}
          onChange={(e) =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }
        ></Input>
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<DollarOutlined></DollarOutlined>}
          placeholder='Precio del curso'
          value={courseData.price}
          onChange={(e) =>
            setCourseData({ ...courseData, price: e.target.value })
          }
        ></Input>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn-submit'>
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}

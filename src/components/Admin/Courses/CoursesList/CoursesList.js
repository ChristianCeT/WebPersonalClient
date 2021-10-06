import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import Modal from "../../../Modal";
import AddEditCourseForm from "../AddEditCourseForm";
import {
  deleteCourseApi,
  getCourseDataUdemyApi,
  updateCourseApi,
} from "../../../../api/course";

import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCoursesArray = [];
    courses.forEach((course) => {
      listCoursesArray.push({
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
            editCourseModal={editCourseModal}
          ></Course>
        ),
      });
    });

    setListCourses(listCoursesArray);
    // eslint-disable-next-line
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const accessToken = getAccessTokenApi();

    sortedList.forEach((item) => {
      const { _id } = item.content.props.course;
      const order = item.rank;
      updateCourseApi(accessToken, _id, { order });
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      ></AddEditCourseForm>
    );
  };

  const editCourseModal = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      ></AddEditCourseForm>
    );
  };

  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando curso",
      content: `¿Estás seguro de que quieres eliminar el curso ${course.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCourses(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, inténtalo más tarde.",
            });
          });
      },
    });
  };

  return (
    <div className='courses-list'>
      <div className='courses-list__header'>
        <Button type='primary' onClick={addCourseModal}>
          Nuevo curso
        </Button>
      </div>

      <div className='courses-list__items'>
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList
          items={listCourses}
          onSort={onSort}
          type='vertical'
        ></DragSortableList>
      </div>
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

function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    let unmounted = false;
    getCourseDataUdemyApi(course.idCourse).then((response) => {
      if (response.code !== 200) {
        notification["warning"]({
          message: `El curso con el id ${course.idCourse} no se ha encontrado.`,
        });
      } else if (!unmounted) {
        setCourseData(response.data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [course]);

  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type='primary' onClick={() => editCourseModal(course)}>
          <EditOutlined></EditOutlined>
        </Button>,

        <Button type='danger' onClick={() => deleteCourse(course)}>
          <DeleteOutlined></DeleteOutlined>
        </Button>,
      ]}
    >
      <img
        src={courseData.image_480x270}
        alt={courseData.title}
        style={{ width: "100px", marginRight: "20px" }}
      ></img>
      <List.Item.Meta
        title={`${courseData.title} | ID: ${course.idCourse}`}
        description={courseData.headline}
      ></List.Item.Meta>
    </List.Item>
  );
}

/*if (courses.length > 0) {
    courses.forEach((course) => {
      getCourseDataUdemyApi(course.idCourse).then((response) => {
        console.log(response);
      });
    });
  }*/

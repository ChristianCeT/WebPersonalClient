import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getCourseDataUdemyApi } from "../../../../api/course";

import "./CoursesList.scss";
export default function CoursesList(props) {
  const { courses } = props;
  return (
    <div className='courses-list'>
      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={8} className='courses-list__course'>
            <Course course={course}></Course>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse, setUrlCourse] = useState("");

  const { Meta } = Card;

  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, inténtelo más tarde.",
        });
      });
    // eslint-disable-next-line
  }, [course]);

  const mountUrl = (url) => {
    if (!course.link) {
      const baseURL = `https://www.udemy.com${url}`;
      const finalUrl =
        baseURL + (course.coupon ? `?couponCode=${course.coupon}` : "");
      setUrlCourse(finalUrl);
    } else {
      setUrlCourse(course.link);
    }
  };

  return (
    <a href={urlCourse} target='_blank' rel='noopener noreferrer'>
      <Card
        cover={
          <img src={courseInfo.image_480x270} alt={courseInfo.title}></img>
        }
      >
        <Meta title={courseInfo.title} description={courseInfo.headline}></Meta>

        <Button>Entrar en el curso</Button>

        <div className='courses-list__course-footer'>
          <p>{course.price ? `$${course.price}` : courseInfo.price}</p>
          <div>
            <Rate disabled defaultValue={5}></Rate>
          </div>
        </div>
      </Card>
    </a>
  );
}

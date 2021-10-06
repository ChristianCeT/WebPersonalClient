import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPikachu from "../../../assets/img/jpg/pikachu.jpg";

import "./ReviewCourses.scss";

export default function ReviewCourses() {
  return (
    <Row className='reviews-courses'>
      <Col lg={4}></Col>
      <Col lg={16} className='reviews-courses__title'>
        <h2>
          Forma parte de los +35 mil estudiantes que están aprendiendo con mis
          cursos
        </h2>
      </Col>
      <Col lg={4}></Col>

      <Col lg={4}></Col>
      <Col lg={16}>
        <Row className='row-cards'>
          <Col md={8}>
            <CardReview
              name='Alex Lopez'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Un curso excelente ga'
            ></CardReview>
          </Col>
          <Col md={8}>
            <CardReview
              name='David Merino'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Me gusta profundizar los cursos y se ve que es un buen maestro'
            ></CardReview>
          </Col>
          <Col md={8}>
            <CardReview
              name='Geronimo Lopez'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Que excelente curso'
            ></CardReview>
          </Col>
        </Row>

        <Row className='row-cards'>
          <Col md={8}>
            <CardReview
              name='Mark Solis'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Me gusto mucho el curso'
            ></CardReview>
          </Col>
          <Col md={8}>
            <CardReview
              name='Angela Lopez'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Que buen curso me encontre buscando por ahi'
            ></CardReview>
          </Col>
          <Col md={8}>
            <CardReview
              name='Maria Lopez'
              subtitle='Alumno de gaa'
              avatar={AvatarPikachu}
              review='Buena agustin.'
            ></CardReview>
          </Col>
        </Row>
      </Col>
      <Col lg={4}></Col>
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className='reviews-courses__card'>
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar}></Avatar>}
        title={name}
        description={subtitle}
      ></Meta>
    </Card>
  );
}

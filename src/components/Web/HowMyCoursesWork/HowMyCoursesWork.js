import React from "react";
import { Row, Col, Card } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className='how-my-courses-work'>
      <Col lg={24} className='how-my-courses-work__title'>
        <h2>¿Cómo funcionan mis cursos?</h2>
        <h3>
          Cada curso cuenta con contenido bajo la web de udemy, activa las 24
          horas del día los 365 días del año.
        </h3>
      </Col>

      <Col lg={4}></Col>
      <Col lg={16}>
        <Row className='row-cards'>
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined></ClockCircleOutlined>}
              title='Cursos y clases'
              description='Cursos entre 10 y 30 horas y cada clase del curso con duración máxima.   '
            ></CardInfo>
          </Col>

          <Col md={8}>
            <CardInfo
              icon={<KeyOutlined></KeyOutlined>}
              title='Acceso 24/7'
              description='Acceso a los cursos en cualquier momento.'
            ></CardInfo>
          </Col>

          <Col md={8}>
            <CardInfo
              icon={<MessageOutlined></MessageOutlined>}
              title='Aprendizaje colaborativo'
              description='Aprende con los demás dejando tus dudas para que te ayudemos.'
            ></CardInfo>
          </Col>
        </Row>

        <Row className='row-cards'>
          <Col md={8}>
            <CardInfo
              icon={<UserOutlined></UserOutlined>}
              title='Mejora tu perfil'
              description='Aprende y mejora tu perfil para mantenerte actualizado.'
            ></CardInfo>
          </Col>

          <Col md={8}>
            <CardInfo
              icon={<DollarOutlined></DollarOutlined>}
              title='Precios bajos'
              description='Obten el curso que necesitas por solo 9.99 y ten accesso a todo el contenido.'
            ></CardInfo>
          </Col>

          <Col md={8}>
            <CardInfo
              icon={<CheckCircleOutlined></CheckCircleOutlined>}
              title='Certificados de finalización'
              description='Al completar el curso obtendrás un certificado de finalización que valida ello.'
            ></CardInfo>
          </Col>
        </Row>
      </Col>
      <Col lg={4}></Col>
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className='how-my-courses-work__card'>
      {icon}
      <Meta title={title} description={description}></Meta>
    </Card>
  );
}

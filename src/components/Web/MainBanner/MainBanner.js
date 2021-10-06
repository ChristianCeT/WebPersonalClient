import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className='main-banner'>
      <div className='main-banner__dark'></div>
      <Row>
        <Col lg={4}></Col>
        <Col lg={16}>
          <h2>
            Aprender nuevas <br></br> tecnologías web y móvil.
          </h2>
          <h3>
            A través de cursos prácticos, concisos y actualizados, creados por
            <br></br>
            profesionales con años de experiencia.
          </h3>
        </Col>
        <Col lg={4}></Col>
      </Row>
    </div>
  );
}

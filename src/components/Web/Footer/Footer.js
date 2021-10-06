import React from "react";
import { Layout, Row, Col } from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import NewsLetter from "../Newsletter";

import "./Footer.scss";

export default function Footer() {
  const { Footer } = Layout;
  return (
    <Footer className='footer'>
      <Row>
        <Col md={4}></Col>
        <Col md={16}>
          <Row>
            <Col md={8}>
              <MyInfo></MyInfo>
            </Col>
            <Col md={8}>
              <NavigationFooter></NavigationFooter>
            </Col>
            <Col md={8}>
              <NewsLetter></NewsLetter>
            </Col>
          </Row>

          <Row className='footer__copyright'>
            <Col md={12}>&copy; 2021 ALL RIGHTS RESERVED</Col>
            <Col md={12}>Christian Cervantes Tanta | DESARROLLADOR WEB</Col>
          </Row>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Footer>
  );
}

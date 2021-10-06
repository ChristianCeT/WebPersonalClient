import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowMyCoursesWork from "../components/Web/HowMyCoursesWork";
import ReviewCourses from "../components/Web/ReviewCourses";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Christian Cervantes Tanta</title>
        <meta
          name='description'
          content='Home | Web sobre programación'
          data-react-helmet='true'
        ></meta>
      </Helmet>
      <MainBanner></MainBanner>
      <HomeCourses></HomeCourses>
      <HowMyCoursesWork></HowMyCoursesWork>
      <ReviewCourses></ReviewCourses>
    </>
  );
}

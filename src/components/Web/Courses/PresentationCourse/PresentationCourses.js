import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";
export default function PresentationCourse() {
  return (
    <div className='presentation-courses'>
      <img src={AcademyLogo} alt='Cursos de Christian Cervante'></img>
      <p>
        Aquí encontrarás muchas cosas de las cuales te ayudará a aprender. Unete
        a nosotros y notarás el cambio que habrá dentro de ti y así poder lograr
        tus metas lo más próximo posible.
      </p>

      <p>¡¡Échale un vistazo y aprovecha las ofertas!!</p>
    </div>
  );
}

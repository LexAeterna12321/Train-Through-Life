import React from "react";
import Footer from "./Footer";
const About = () => {
  return (
    <div className="container">
      <div className="col s12 m7">
        <h2 className="header">Informacje o aplikacji</h2>

        <div className="card center-aligned">
          <div className="row">
            <div className="col s12 m6">
              <div
                className="card-image "
                style={{
                  maxWidth: "90%"
                }}
              >
                <img
                  src="https://images.pexels.com/photos/1638324/pexels-photo-1638324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="woman with dumbbells"
                  style={imgStyle}
                />
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card-stacked">
                <div className="card-content valign-wrapper">
                  <p className="flow-text" style={{ lineHeight: "200%" }}>
                    Train Through Life&reg; jest aplikacją przeznaczoną do
                    komunikacji na linii ćwiczący-trener personalny. Dzięki
                    aplikacji użytkownicy mogą w każdym momencie dotrzeć do
                    zarejestrowanych trenerów i proponować terminy spotkań.
                    Aplikacja jest świetnym narzędziem dla osób szukających
                    szybkich i pewnych rozwiązań w poszukiwaniu zajęć z
                    ulubionym trenerem personalnym.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const imgStyle = {
  margin: "20px",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,0)"
};
export default About;

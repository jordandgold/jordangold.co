import Doodle from "../Doodle";
import logo from "../hello-jordan-gold.svg";

function Home() {
  return (
    <>
      <div className="jg__intro">
        <img src={logo} className="intro__badge" alt="" />
        <div>
          <div className="jg__hello">Hello,</div>
          <p>
            my name is Jordan Gold. I'm a software enginer and web developer
            based in Chicago, Illinois.
          </p>
        </div>
      </div>
      <Doodle />
    </>
  );
}

export default Home;

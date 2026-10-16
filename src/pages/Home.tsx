import { Link, List, Separator } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
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
      <Separator className="divider" />
      <List.Root className="links">
        <List.Item className="links__item">
          <List.Indicator asChild className="links__icon">
            <LuExternalLink />
          </List.Indicator>
          <Link
            href="mailto:jordandgold@gmail.com"
            target="_blank"
            className="link"
          >
            Email
          </Link>
        </List.Item>
        <List.Item className="links__item">
          <List.Indicator asChild className="links__icon">
            <LuExternalLink />
          </List.Indicator>
          <Link
            href="http://github.com/jordandgold"
            target="_blank"
            className="link"
          >
            GitHub
          </Link>
        </List.Item>
        <List.Item className="links__item">
          <List.Indicator asChild className="links__icon">
            <LuExternalLink />
          </List.Indicator>
          <Link
            href="https://www.linkedin.com/in/jordandgold/"
            target="_blank"
            className="link"
          >
            LinkedIn
          </Link>
        </List.Item>
      </List.Root>
    </>
  );
}

export default Home;

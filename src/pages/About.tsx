import { Link } from "@chakra-ui/react";
import CubeIcon from "../CubeIcon";

function About() {
  return (
    <>
      <div className="jg__hello">About</div>
      <p>
        I'm Jordan, a software engineer and web developer based in Chicago. I
        like building things people actually use, and I care most about the part
        where technology makes someone's day a little easier.
      </p>
      <h2 className="heading heading--icon">
        <CubeIcon />
        Product development
      </h2>
      <p>
        I enjoy the whole arc of a product, from understanding the problem and
        shaping an idea to shipping it and learning from real use. The best work
        happens close to the people who rely on it, so I stay curious, ask a lot
        of questions, and keep the feedback loop short.
      </p>
      <h2 className="heading heading--icon">
        <CubeIcon />
        Engineering for good outcomes
      </h2>
      <p>
        Code is a means to an end. I try to pick the simplest solution that
        solves the real problem, build it so it's easy to maintain, and measure
        success by the outcome it creates for users and teams, not by how clever
        it is.
      </p>
      <h2 className="heading heading--icon">
        <CubeIcon />
        Running
      </h2>
      <p>
        Outside of work, you'll usually find me running. It clears my head,
        keeps me honest about showing up consistently, and it has taught me the
        same lesson as engineering: steady progress, one mile (or one commit) at
        a time, beats occasional bursts of effort.
      </p>
      <p>
        Want to talk about a project, a product idea, or your favorite running
        route? Find me on{" "}
        <Link
          href="https://www.linkedin.com/in/jordandgold/"
          target="_blank"
          className="link"
        >
          LinkedIn
        </Link>{" "}
        or send me an{" "}
        <Link href="mailto:hello@jordangold.co" className="link">
          email
        </Link>
        .
      </p>
    </>
  );
}

export default About;

import React from "react";
import logo from "./hello-jordan-gold.svg";
import {
  ChakraProvider,
  Container,
  Divider,
  Link,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";

import "./App.scss";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <ChakraProvider>
      <Container maxW="container.sm">
        <div className="jg">
          <img src={logo} className="jg__logo" alt="logo" />
          <div className="jg__greeting">
            <div className="jg__hello">Hello,</div>
            <p>
              my name is Jordan Gold. I'm a software enginer and web developer
              based in Chicago, Illinois.
            </p>
            <Divider marginY={8} color={`#dfe5f3`} borderTopWidth={`2px`} />
            <List spacing={5}>
              <ListItem>
                <ListIcon as={ExternalLinkIcon} color={`#dfe5f3`} />
                <Link
                  className="jg__link"
                  href="mailto:jordandgold@gmail.com"
                  target="_blank"
                  color={`#187fe0`}
                >
                  Email
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={ExternalLinkIcon} color={`#dfe5f3`} />
                <Link
                  className="jg__link"
                  href="http://github.com/jordandgold"
                  target="_blank"
                  color={`#187fe0`}
                >
                  GitHub
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={ExternalLinkIcon} color={`#dfe5f3`} />
                <Link
                  className="jg__link"
                  href="https://www.linkedin.com/in/jordandgold/"
                  target="_blank"
                  color={`#187fe0`}
                >
                  LinkedIn
                </Link>
              </ListItem>
            </List>
            <Divider marginY={8} color={`#dfe5f3`} borderTopWidth={`2px`} />
            <p>copyright &copy; jordangold.co {currentYear}</p>
          </div>
        </div>
      </Container>
    </ChakraProvider>
  );
}

export default App;

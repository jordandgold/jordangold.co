import { Link, List } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

const socialLinks = [
  { label: "Email", href: "mailto:jordandgold@gmail.com", external: false },
  { label: "GitHub", href: "https://github.com/jordandgold", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jordandgold/",
    external: true,
  },
];

function SocialLinks() {
  return (
    <List.Root className="links">
      {socialLinks.map(({ label, href, external }) => (
        <List.Item className="links__item" key={label}>
          <List.Indicator asChild className="links__icon">
            <LuExternalLink />
          </List.Indicator>
          <Link
            href={href}
            className="link"
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {label}
          </Link>
        </List.Item>
      ))}
    </List.Root>
  );
}

export default SocialLinks;

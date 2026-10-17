import CubeIcon from "../CubeIcon";
import workdayLogo from "../logos/workday.svg";
import servicenowLogo from "../logos/servicenow.png";

type Job = {
  company: string;
  logo: string;
  role: string;
  dates: string;
  highlights: string[];
};

const experience: Job[] = [
  {
    company: "Workday",
    logo: workdayLogo,
    role: "Software Engineer III",
    dates: "January 2022 – Present",
    highlights: [
      "Build and maintain multiple products across the Data Collab organization, including Workday Drive, Slides, and Worksheets, leading features from technical discovery through production.",
      "Develop and ship Generative AI customer-facing features and integrations across Workday products.",
      "Drive production reliability through SLOs, monitoring, alerting, and observability, leveraging Grafana, Pharos, Splunk, Elastic, and PagerDuty.",
      "Support applications in FedRAMP and Impact Level 4 (IL4) environments, operating within stringent security, compliance, and reliability requirements.",
      "Participate in 24×7 on-call rotations, triaging and resolving customer-impacting issues and partnering across engineering teams to improve system reliability.",
    ],
  },
  {
    company: "Workday",
    logo: workdayLogo,
    role: "Software Engineer II",
    dates: "July 2019 – September 2021",
    highlights: [
      "Led engineering efforts for the Worksheets web team, delivering features from technical discovery through production while partnering with product, design, and analytics.",
      "Audited and improved complex web applications to meet WCAG 2.1 AA accessibility standards, including rearchitecting keyboard event handling.",
      "Built and maintained comprehensive automated testing and CI practices to improve application quality and release confidence.",
      "Instrumented application features in partnership with business analytics to support user-data collection and product insights.",
      "Contributed to production operations through monitoring, alerting, troubleshooting, and customer support.",
    ],
  },
  {
    company: "ServiceNow",
    logo: servicenowLogo,
    role: "Software Engineer",
    dates: "September 2021 – January 2022",
    highlights: [
      "Developed front-end features for the UI Builder team, contributing to a large-scale enterprise web application.",
      "Built reusable UI functionality and collaborated with product, design, and engineering teams to deliver customer-facing features.",
    ],
  },
];

const skills: { label: string; items: string[] }[] = [
  {
    label: "Languages & Frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "React",
      "Redux",
      "Next.js",
      "Node.js",
      "Java",
    ],
  },
  {
    label: "Testing & Development",
    items: ["Cypress", "Git", "Automated Testing", "CI/CD"],
  },
  {
    label: "Observability & Reliability",
    items: [
      "Grafana",
      "Pharos",
      "Splunk",
      "Elastic",
      "Solas",
      "PagerDuty",
      "SLOs",
      "Monitoring",
      "Alerting",
      "On-Call Operations",
      "Incident Triage & Mitigation",
    ],
  },
  {
    label: "Design & UX",
    items: [
      "Figma",
      "Design Systems",
      "High- & Low-Fidelity Prototyping",
      "Accessibility (a11y/WCAG)",
    ],
  },
  {
    label: "Enterprise & Compliance",
    items: [
      "FedRAMP",
      "Impact Level 4 (IL4)",
      "STIG Remediation",
      "Vulnerability Management",
    ],
  },
];

function Work() {
  return (
    <>
      <div className="jg__hello">Work</div>

      <section className="resume__section">
        <h2 className="heading heading--icon resume__label">
          <CubeIcon />
          Experience
        </h2>
        <div className="resume__content">
          {experience.map((job) => (
            <article className="job" key={job.dates}>
              <header className="job__header">
                <div className="job__title">
                  <img
                    className="job__logo"
                    src={job.logo}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <div className="job__text">
                    <div className="job__company">{job.company}</div>
                    <div className="job__role">{job.role}</div>
                  </div>
                </div>
                <div className="job__dates">{job.dates}</div>
              </header>
              <ul className="job__highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume__section">
        <h2 className="heading heading--icon resume__label">
          <CubeIcon />
          Skills
        </h2>
        <div className="resume__content">
          <div className="skills">
            {skills.map((skill) => (
              <div className="skills__group" key={skill.label}>
                <div className="skills__label">{skill.label}</div>
                <ul className="skills__pills">
                  {skill.items.map((item) => (
                    <li className="pill" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Work;

import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const socialButtons = [
  {
    key: "email",
    label: "email",
    icon: faEnvelope,
    placeholder: "test@gmail.com",
  },
  {
    key: "linkedin",
    label: "linkedIn",
    icon: faLinkedin,
    placeholder: "https://www.linkedin.com/in/account_name",
  },
  {
    key: "github",
    label: "gitHub",
    icon: faGithub,
    placeholder: "https://github.com/account_name",
  },
  {
    key: "x",
    label: "x",
    icon: faXTwitter,
    placeholder: "https://twitter.com/account_name",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://www.instagram.com/account_name",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "https://www.youtube.com/account_name",
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
  },
];

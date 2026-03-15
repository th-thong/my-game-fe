import { Link } from "react-router-dom";
import { SiGitlab } from "react-icons/si";

type ClickProps = {
  onAction?: React.MouseEventHandler<HTMLAnchorElement>;
};

const About = () => {
  return (
    <div>
      <h3 className="lg:pl-3.5 text-xs font-semibold text-zinc-100 mb-2 ">
        About
      </h3>
      <p className="lg:pl-3.5 text-xs text-zinc-400 leading-relaxed max-w-80">
        MyWuwa is an unofficial fan-made website for Wuthering Waves. We are not
        affiliated with Kuro Games.
      </p>
    </div>
  );
};

const Resources = ({ onAction }: ClickProps) => {
  const links = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/terms-of-service", label: "Terms of Service" },
  ];

  return (
    <div>
      <h3 className="text-xs font-semibold text-zinc-100 mb-2">Resources</h3>
      <ul className="space-y-1">
        {links.map((link) => (
          <FooterLink key={link.to} {...link} onAction={onAction} />
        ))}
      </ul>
    </div>
  );
};

const Community = () => {
  return (
    <div>
      <h3 className="text-xs font-semibold text-zinc-100 mb-2">Community</h3>
      <ul className="space-y-1">
        <li>
          <a
            href="https://gitlab.com/my-game873206"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-2"
          >
            <SiGitlab className="w-3 h-3" />
            <span>GitLab</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Copyright = () => {
  return (
    <div className=" pt-3">
      <p className="text-xs text-zinc-500 text-center">
        © {new Date().getFullYear()} MyWuwa. All rights reserved. This is an
        unofficial fan-made website and is not affiliated with Kuro Games.
      </p>
    </div>
  );
};

const FooterLink = ({
  to,
  label,
  onAction,
}: {
  to: string;
  label: string;
  onAction?: ClickProps["onAction"];
}) => (
  <li>
    <Link
      to={to}
      onClick={onAction}
      className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
    >
      {label}
    </Link>
  </li>
);

export function Footer() {
  const handleNavigationClick = () => window.scrollTo(0, 0);

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm py-4 px-4">
      <div className="max-w-7xl lg:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <About />
          <div className="grid grid-cols-2 gap-4">
            <Resources onAction={handleNavigationClick} />
            <Community />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

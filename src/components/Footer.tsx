import { Link } from "react-router-dom";
import { SiGitlab } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/40 backdrop-blur-sm py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-100 mb-2">
              Resources
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          {/*
          <div>
            <h3 className="text-xs font-semibold text-zinc-100 mb-2">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:support@example.com"
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          */}

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-100 mb-2">
              Community
            </h3>
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

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-100 mb-2">About</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              MyWuwa is an unofficial fan-made website for Wuthering Waves. We
              are not affiliated with Kuro Games.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-800/60 pt-3">
          <p className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} MyWuwa. All rights reserved. This is an
            unofficial fan-made website and is not affiliated with Kuro Games.
          </p>
        </div>
      </div>
    </footer>
  );
}

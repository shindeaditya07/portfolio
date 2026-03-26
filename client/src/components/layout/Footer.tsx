import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-purple-500/10 py-8 mt-auto">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-lg gradient-text">{PERSONAL_INFO.name}</span>
            <p className="text-slate-500 text-sm mt-0.5">{PERSONAL_INFO.shortDescription}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-purple-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={SOCIAL_LINKS[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-purple-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-500 hover:text-purple-400 transition-colors"
              aria-label="Email"
            >
              <FaEnvelope size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-slate-600 text-xs flex items-center gap-1">
            © {year} {PERSONAL_INFO.name} · Made with <FaHeart className="text-purple-500" size={10} />
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

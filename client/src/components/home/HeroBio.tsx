import { motion } from 'framer-motion'
import { PERSONAL_INFO } from '../../utils/constants'
import Button from '../ui/Button'
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'
import { useResumePanel } from '../../context/ResumePanelContext'

const HeroBio = () => {
  const { open: openPanel } = useResumePanel()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3 }}
      className="space-y-6"
    >
      {/* Bio paragraph */}
      <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
        {PERSONAL_INFO.bio}
      </p>

      {/* Education pill */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="text-purple-400">🎓</span>
        <span>
          {PERSONAL_INFO.education.degree} ·{' '}
          <span className="text-slate-400">{PERSONAL_INFO.education.university}</span>
          <span className="ml-1 text-purple-400">· GPA {PERSONAL_INFO.education.gpa}</span>
        </span>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button href="/projects" variant="primary" size="lg">
          View My Projects
        </Button>
        <Button variant="secondary" size="lg" onClick={openPanel}>
          <FaFileAlt size={14} />
          Resume
        </Button>
      </div>

      {/* Social row */}
      <div className="flex items-center gap-4 pt-2">
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors text-sm"
        >
          <FaGithub size={16} />
          {PERSONAL_INFO.githubUsername}
        </a>
        <span className="text-slate-600">·</span>
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors text-sm"
        >
          <FaLinkedin size={16} />
          LinkedIn
        </a>
      </div>
    </motion.div>
  )
}

export default HeroBio

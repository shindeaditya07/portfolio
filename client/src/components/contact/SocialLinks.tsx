import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants'
import GlowCard from '../ui/GlowCard'

const SocialLinks = () => {
  const links = [
    {
      icon: FaGithub,
      label: 'GitHub',
      value: PERSONAL_INFO.githubUsername,
      url: PERSONAL_INFO.github,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: PERSONAL_INFO.linkedinUsername,
      url: PERSONAL_INFO.linkedin,
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: PERSONAL_INFO.email,
      url: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: PERSONAL_INFO.location,
      url: undefined,
    },
  ]

  return (
    <GlowCard className="p-6 space-y-4">
      <h3 className="font-display font-semibold text-lg text-slate-100 mb-5">Get in touch</h3>
      {links.map(({ icon: Icon, label, value, url }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 flex-shrink-0 glass border border-purple-500/20 rounded-lg flex items-center justify-center">
            <Icon size={16} className="text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
            {url ? (
              <a
                href={url}
                target={url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                {value}
              </a>
            ) : (
              <p className="text-slate-300 text-sm font-medium">{value}</p>
            )}
          </div>
        </motion.div>
      ))}

      {/* Availability card */}
      <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Open to opportunities
        </div>
        <p className="text-slate-500 text-xs mt-1">
          Currently looking for full-time roles in software engineering and AI/ML.
        </p>
      </div>
    </GlowCard>
  )
}

export default SocialLinks

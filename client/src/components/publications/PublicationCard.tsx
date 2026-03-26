import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaCertificate } from 'react-icons/fa'

interface PublicationCardProps {
  title: string
  journal?: string
  conference?: string
  date: string
  link?: string
  type: string
  authors: string[]
  abstract?: string
  index: number
}

const PublicationCard = ({
  title,
  journal,
  conference,
  date,
  link,
  type,
  authors,
  abstract,
  index,
}: PublicationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="glass glass-hover p-6 rounded-2xl"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300">
            {type}
          </span>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <h3 className="font-semibold text-slate-100 mb-2 leading-snug">{title}</h3>
        {(journal || conference) && (
          <p className="text-purple-400 text-sm mb-2">{journal || conference}</p>
        )}
        <p className="text-slate-500 text-xs mb-3">{authors.join(', ')}</p>
        {abstract && <p className="text-slate-400 text-sm leading-relaxed">{abstract}</p>}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-purple-300 transition-colors p-1 flex-shrink-0"
        >
          <FaExternalLinkAlt size={14} />
        </a>
      )}
    </div>
  </motion.div>
)

interface CertificationCardProps {
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  badgeUrl?: string
  category?: string
  index: number
}

const CertificationCard = ({
  name,
  issuer,
  date,
  credentialUrl,
  category,
  index,
}: CertificationCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: index * 0.07 }}
    className="glass glass-hover p-5 rounded-xl"
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 flex-shrink-0 glass border border-purple-500/20 rounded-lg flex items-center justify-center">
        <FaCertificate size={16} className="text-purple-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-slate-100 text-sm leading-snug mb-1">{name}</h4>
        <p className="text-purple-400 text-xs mb-1">{issuer}</p>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 text-xs">{date}</span>
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              View ↗
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

export { PublicationCard, CertificationCard }

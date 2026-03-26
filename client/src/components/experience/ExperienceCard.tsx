import { motion } from 'framer-motion'

interface Experience {
  company: string
  role: string
  duration: string
  location: string
  type: string
  current: boolean
  description: string[]
  logo?: string
  order: number
}

const TYPE_COLORS: Record<string, string> = {
  'Full Time': 'text-emerald-400',
  'Internship': 'text-blue-400',
}

const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="glass glass-hover p-6 md:p-8 rounded-2xl relative">
        {exp.current && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Current
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
          {/* Company logo */}
          <div className="w-14 h-14 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-200/10 bg-white flex items-center justify-center p-2 shadow-md">
            {exp.logo ? (
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // fallback to initial letter if logo fails to load
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="font-bold text-xl text-purple-400">${exp.company.slice(0, 1)}</span>`
                  }
                }}
              />
            ) : (
              <span className="font-bold text-xl text-purple-400">{exp.company.slice(0, 1)}</span>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-display font-bold text-xl text-slate-100">{exp.role}</h3>
            <p className="text-purple-300 font-medium">{exp.company}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-500">
              <span>{exp.duration}</span>
              <span>·</span>
              <span>{exp.location}</span>
              <span>·</span>
              <span className={TYPE_COLORS[exp.type] ?? 'text-slate-400'}>
                {exp.type}
              </span>
            </div>
          </div>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2">
          {exp.description.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
              <span className="text-purple-500 mt-1.5 text-xs flex-shrink-0">▹</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default ExperienceCard

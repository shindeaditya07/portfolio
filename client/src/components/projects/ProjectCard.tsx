import { motion } from 'framer-motion'
import { PROJECTS, PROJECT_CATEGORIES } from '../../utils/constants'
import GlowCard from '../ui/GlowCard'
import Tag from '../ui/Tag'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useState } from 'react'

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
  >
    <GlowCard className="p-6 h-full flex flex-col">
      {/* Project number + title */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <span className="font-mono text-purple-500/30 text-2xl font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display font-bold text-lg text-slate-100 mt-1">{project.title}</h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {project.featured && (
            <span title="Featured" className="text-yellow-400 text-base leading-none">⭐</span>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-purple-300 transition-colors p-1.5"
            >
              <FaGithub size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-purple-300 transition-colors p-1.5"
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <Tag key={tech} text={tech} />
        ))}
      </div>
    </GlowCard>
  </motion.div>
)

const ProjectFilter = ({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (cat: string) => void
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {PROJECT_CATEGORIES.map((cat) => (
      <Tag
        key={cat}
        text={cat}
        active={selected === cat}
        onClick={() => onSelect(cat)}
        size="md"
      />
    ))}
  </div>
)

export { ProjectCard, ProjectFilter }

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { PROJECTS as STATIC_PROJECTS, HOME_CONFIG, Project } from '../../utils/constants'
import { projectsAPI } from '../../utils/api'
import Tag from '../ui/Tag'
import { Link } from 'react-router-dom'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import GlowCard from '../ui/GlowCard'

const FeaturedProjects = () => {
  const { ref, isVisible } = useScrollAnimation()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectsAPI.getAll()
        setProjects(data.length > 0 ? data : STATIC_PROJECTS)
      } catch (error) {
        setProjects(STATIC_PROJECTS)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const featured = projects.filter((p) => p.featured).slice(0, 2)

  return (
    <section ref={ref} className="py-16">
      <div className="section-container">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-purple-400 font-mono text-xs tracking-widest uppercase mb-3"
        >
          {HOME_CONFIG.featuredLabel}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-3xl md:text-4xl gradient-text mb-10"
        >
          {HOME_CONFIG.featuredHeading}
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {featured.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <GlowCard className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Project number */}
                    <div className="flex-shrink-0">
                      <span className="font-mono text-purple-500/30 text-5xl font-bold select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-purple-400 font-mono text-xs tracking-wider uppercase mb-1">
                          {HOME_CONFIG.featuredProjectBadge}
                        </p>
                        <h3 className="font-display font-bold text-xl md:text-2xl text-slate-100">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-slate-400 leading-relaxed">{project.description}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Tag key={tech} text={tech} />
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 pt-1">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors text-sm"
                          >
                            <FaGithub size={16} />
                            GitHub
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-400 hover:text-purple-300 transition-colors text-sm"
                          >
                            <FaExternalLinkAlt size={13} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group"
          >
            View all {projects.length} projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjects

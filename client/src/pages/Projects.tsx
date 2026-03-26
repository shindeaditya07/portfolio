import { useState, useEffect } from 'react'
import { PROJECTS as STATIC_PROJECTS, Project } from '../utils/constants'
import { projectsAPI } from '../utils/api'
import { ProjectCard, ProjectFilter } from '../components/projects/ProjectCard'
import SectionHeading from '../components/ui/SectionHeading'
import { motion, AnimatePresence } from 'framer-motion'

const Projects = () => {
  const [selected, setSelected] = useState('All')
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await projectsAPI.getAll()
        setProjects(data.length > 0 ? data : STATIC_PROJECTS)
      } catch (error) {
        console.error('Failed to fetch projects, falling back to static data', error)
        setProjects(STATIC_PROJECTS)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filtered =
    selected === 'All'
      ? projects
      : projects.filter((p) => p.category === selected)

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/8 -top-20 left-1/3" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          title="All Projects"
          subtitle={`${projects.length} projects spanning AI/ML, Full Stack, Computer Vision, and Data.`}
        />

        <ProjectFilter selected={selected} onSelect={setSelected} />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.title} project={project as any} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-center text-slate-500 py-20">No projects in this category.</p>
        )}
      </div>
    </div>
  )
}

export default Projects

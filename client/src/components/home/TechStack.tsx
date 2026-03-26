import { motion } from 'framer-motion'
import { TECH_STACK, HOME_CONFIG } from '../../utils/constants'
import {
  SiReact, SiTypescript, SiPython, SiNodedotjs, SiMongodb,
  SiTensorflow, SiDocker, SiGit, SiFastapi, SiPostgresql,
  SiTailwindcss, SiFlask, SiPytorch, SiJavascript, SiMeta, SiGithub
} from 'react-icons/si'
import useScrollAnimation from '../../hooks/useScrollAnimation'

const ICON_MAP: Record<string, React.ElementType> = {
  SiReact, SiTypescript, SiPython, SiNodedotjs, SiMongodb,
  SiTensorflow, SiDocker, SiGit, SiFastapi, SiPostgresql,
  SiTailwindcss, SiFlask, SiPytorch, SiJavascript, SiMeta, SiGithub,
}

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section ref={ref} className="py-16">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-slate-500 text-xs tracking-widest uppercase mb-8"
        >
          {HOME_CONFIG.techStackSectionLabel}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          {TECH_STACK.map((tech, i) => {
            const Icon = ICON_MAP[tech.icon]
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col items-center gap-2 p-4 glass border border-purple-500/10 rounded-xl hover:border-purple-500/40 hover:shadow-glow-sm transition-all duration-300 w-[84px]"
              >
                {Icon ? (
                  <Icon
                    size={26}
                    style={{ color: tech.color }}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-xl font-bold text-purple-400">
                    {tech.name.slice(0, 2)}
                  </span>
                )}
                <span className="text-xs text-slate-400 group-hover:text-slate-300 text-center leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TechStack

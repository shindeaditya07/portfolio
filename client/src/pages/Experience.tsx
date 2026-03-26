import { useState, useEffect } from 'react'
import { EXPERIENCES as STATIC_EXPERIENCES } from '../utils/constants'
import { experienceAPI } from '../utils/api'
import ExperienceCard from '../components/experience/ExperienceCard'
import SectionHeading from '../components/ui/SectionHeading'

const Experience = () => {
  const [experiences, setExperiences] = useState(STATIC_EXPERIENCES)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await experienceAPI.getAll()
        setExperiences(data.length > 0 ? data : STATIC_EXPERIENCES)
      } catch (error) {
        console.error('Failed to fetch experiences', error)
        setExperiences(STATIC_EXPERIENCES)
      } finally {
        setIsLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-purple-600/8 top-0 right-0" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey — from intern to full-time developer."
          align="left"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="space-y-6 md:pl-16">
              {experiences.map((exp, i) => (
                <ExperienceCard key={`${exp.company}-${exp.role}`} exp={exp as any} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Experience

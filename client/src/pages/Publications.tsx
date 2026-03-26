import { useState, useEffect } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import { PublicationCard, CertificationCard } from '../components/publications/PublicationCard'
import {
  PUBLICATIONS as STATIC_PUBLICATIONS,
  CERTIFICATIONS as STATIC_CERTIFICATIONS,
} from '../utils/constants'
import { publicationsAPI, certificationsAPI } from '../utils/api'

const Publications = () => {
  const [tab, setTab] = useState<'publications' | 'certifications'>('publications')
  const [publications, setPublications] = useState(STATIC_PUBLICATIONS)
  const [certifications, setCertifications] = useState(STATIC_CERTIFICATIONS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pubRes, certRes] = await Promise.all([
          publicationsAPI.getAll().catch(() => ({ data: [] })),
          certificationsAPI.getAll().catch(() => ({ data: [] }))
        ])
        
        setPublications(pubRes.data.length > 0 ? pubRes.data : STATIC_PUBLICATIONS)
        setCertifications(certRes.data.length > 0 ? certRes.data : STATIC_CERTIFICATIONS)
      } catch (error) {
        console.error('Failed to fetch data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-violet-600/8 top-20 -right-40" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          title="Publications & Certifications"
          subtitle="Research contributions and professional certifications."
        />

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex glass border border-purple-500/20 rounded-xl p-1 gap-1">
            {(['publications', 'certifications'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                  tab === t
                    ? 'bg-purple-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
        ) : tab === 'publications' ? (
          <div className="space-y-5 max-w-3xl mx-auto">
            {publications.map((pub, i) => (
              <PublicationCard key={pub.title} {...pub as any} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <CertificationCard key={cert.name} {...cert as any} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Publications

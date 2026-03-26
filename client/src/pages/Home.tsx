import { motion } from 'framer-motion'
import HeroAvatar from '../components/home/HeroAvatar'
import HeroHeadline from '../components/home/HeroHeadline'
import HeroBio from '../components/home/HeroBio'
import OrbitAnimation from '../components/home/OrbitAnimation'
import TechStack from '../components/home/TechStack'
import FeaturedProjects from '../components/home/FeaturedProjects'
import { HOME_CONFIG } from '../utils/constants'

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb w-[600px] h-[600px] bg-purple-600/10 -top-40 -left-40" />
        <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/8 top-1/2 -right-20" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="section-container w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="space-y-6 order-2 lg:order-1">
              <HeroHeadline />
              <HeroBio />
            </div>

            {/* Right: Avatar */}
            <div className="flex justify-center order-1 lg:order-2">
              <HeroAvatar />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase">
            {HOME_CONFIG.scrollIndicatorLabel}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* Orbit animation section */}
      <section className="py-16 relative">
        <div className="section-container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-500 text-xs tracking-widest uppercase mb-10"
          >
            {HOME_CONFIG.techSectionLabel}
          </motion.p>
          <OrbitAnimation />
        </div>
      </section>

      {/* Tech stack grid */}
      <TechStack />

      {/* Featured projects */}
      <FeaturedProjects />

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-10 md:p-16 max-w-2xl mx-auto border border-purple-500/20 rounded-2xl"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl gradient-text mb-4">
              {HOME_CONFIG.ctaHeading}
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              {HOME_CONFIG.ctaSubtext}
            </p>
            <a
              href={HOME_CONFIG.ctaButtonHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg shadow-glow hover:shadow-glow-lg transition-all duration-200"
            >
              {HOME_CONFIG.ctaButtonText}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

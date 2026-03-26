import SectionHeading from '../components/ui/SectionHeading'
import ContactForm from '../components/contact/ContactForm'
import SocialLinks from '../components/contact/SocialLinks'

const Contact = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-purple-600/10 bottom-0 left-1/4" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to chat? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Contact form (2/3 width) */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Social links sidebar (1/3 width) */}
          <div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

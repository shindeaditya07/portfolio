import { motion } from 'framer-motion'
import { contactAPI } from '../../utils/api'
import useForm from '../../hooks/useForm'
import Button from '../ui/Button'
import GlowCard from '../ui/GlowCard'
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

const ContactForm = () => {
  const { values, errors, isSubmitting, isSuccess, handleChange, handleSubmit } = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate: (v) => {
      const errs: Record<string, string> = {}
      if (!v.name.trim()) errs.name = 'Name is required'
      if (!v.email.trim() || !/\S+@\S+\.\S+/.test(v.email)) errs.email = 'Valid email is required'
      if (!v.message.trim() || v.message.length < 10) errs.message = 'Message must be at least 10 characters'
      return errs
    },
    onSubmit: async (values) => {
      await contactAPI.submit({
        name: values.name,
        email: values.email,
        message: values.message,
      })
    },
  })

  if (isSuccess) {
    return (
      <GlowCard className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center gap-4"
        >
          <FaCheckCircle size={48} className="text-emerald-400" />
          <h3 className="font-display font-bold text-xl text-slate-100">Message sent! 🎉</h3>
          <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
        </motion.div>
      </GlowCard>
    )
  }

  return (
    <GlowCard className="p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-navy-800/60 border border-purple-500/20 focus:border-purple-500/60 rounded-lg text-slate-200 placeholder-slate-600 outline-none transition-colors text-sm"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-navy-800/60 border border-purple-500/20 focus:border-purple-500/60 rounded-lg text-slate-200 placeholder-slate-600 outline-none transition-colors text-sm"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Tell me about your project or opportunity..."
            rows={5}
            className="w-full px-4 py-3 bg-navy-800/60 border border-purple-500/20 focus:border-purple-500/60 rounded-lg text-slate-200 placeholder-slate-600 outline-none transition-colors text-sm resize-none"
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>

        {errors.submit && (
          <p className="text-red-400 text-sm">{errors.submit}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full justify-center"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FaPaperPlane size={14} />
              Send Message
            </>
          )}
        </Button>
      </form>
    </GlowCard>
  )
}

export default ContactForm

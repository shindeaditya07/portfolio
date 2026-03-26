import { motion, AnimatePresence } from 'framer-motion'
import { useResumePanel } from '../../context/ResumePanelContext'
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa'
import { PERSONAL_INFO } from '../../utils/constants'

const ResumePanel = () => {
  const { isOpen, close } = useResumePanel()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay — clicking it closes the panel */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          />

          {/* Side panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[520px] md:w-[600px] z-50 flex flex-col"
            style={{
              background: 'rgba(10, 10, 26, 0.97)',
              borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-purple-500/15 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="font-medium text-slate-200 text-sm">Resume</span>
                <span className="text-slate-600 text-xs">· {PERSONAL_INFO.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Open in new tab */}
                <a
                  href={PERSONAL_INFO.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  className="p-2 text-slate-500 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
                >
                  <FaExternalLinkAlt size={13} />
                </a>

                {/* Download */}
                <a
                  href={PERSONAL_INFO.resume}
                  download={PERSONAL_INFO.resumeFileName}
                  title="Download"
                  className="p-2 text-slate-500 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all"
                >
                  <FaDownload size={13} />
                </a>

                {/* Close */}
                <button
                  onClick={close}
                  title="Close"
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${PERSONAL_INFO.resume}#toolbar=0&navpanes=0&scrollbar=1`}
                title={`${PERSONAL_INFO.name} Resume`}
                className="w-full h-full border-0"
                style={{ background: '#fff' }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResumePanel

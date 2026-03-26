import { createContext, useContext, useState } from 'react'

interface ResumePanelContextType {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const ResumePanelContext = createContext<ResumePanelContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export const useResumePanel = () => useContext(ResumePanelContext)

export const ResumePanelProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ResumePanelContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </ResumePanelContext.Provider>
  )
}

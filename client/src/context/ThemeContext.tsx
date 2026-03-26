import { createContext, useContext, ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true })

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Dark mode is the only mode for this portfolio
  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

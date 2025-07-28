import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <>
    <HelmetProvider>
      <Toaster position='top-right' />
      <App />
    </HelmetProvider>
  </>
)

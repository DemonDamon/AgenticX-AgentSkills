import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from './i18n'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SkillsPage from './pages/SkillsPage'
import SkillDetailPage from './pages/SkillDetailPage'

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/skills/:id" element={<SkillDetailPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </I18nProvider>
  )
}

export default App

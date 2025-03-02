import './App.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

function App() {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col antialiased font-sans">
        <Home />
      </div>
    </Layout>

  );
}

export default App

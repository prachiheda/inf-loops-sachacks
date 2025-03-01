import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextInput from "@/components/TextInput";


function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TextInput/>
    </div>
  );
}

export default App

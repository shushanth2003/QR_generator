import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import QRGenerator from './Components/QRGenerator'
import './Customcss/Style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <QRGenerator/>
    
  )
}

export default App

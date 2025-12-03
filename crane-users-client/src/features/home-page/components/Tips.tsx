import {useState,useEffect} from 'react'
import {craneOperatorTips} from '../../../app/helpers.ts'

const Tips = () => {
    const [tip, setTip] = useState("")
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * craneOperatorTips.length);
        setTip(craneOperatorTips[randomIndex])
    }, [])
    

  return (
    <div>
      <h3>Tip: {tip}</h3>
    </div>
  )
}

export default Tips

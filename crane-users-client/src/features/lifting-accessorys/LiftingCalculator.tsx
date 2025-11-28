import {useEffect, useState} from 'react'
import {useSelector, useDispatch } from "react-redux";
import type {RootState, AppDispatch} from '../../app/store.ts'
// import {addChain, addStrap, addCable} from './state/LiftingCalculatorSlice.ts'
import ChainForm from './components/ChainForm'
import StrapForm from './components/StrapForm'
import CableForm from './components/CableForm'

const LiftingCalculator = () => {
  const [isChainPressed, setisChainPressed] = useState(false)
  const [isStrapPressed, setisStrapPressed] = useState(false)
  const [isCablePressed, setisCablePressed] = useState(false)
  const equipments = useSelector((state:RootState) =>state.equipmentsReducer.equipments)
  // const dispatch:AppDispatch = useDispatch()

  const toggleChain =() =>{
    setisStrapPressed(false);
    setisCablePressed(false);
    setisChainPressed(!isChainPressed)
  }

  const toggleStrap =() =>{
    setisStrapPressed(!isStrapPressed);
    setisCablePressed(false);
    setisChainPressed(false)
  }

   const toggleCable =() =>{
    setisStrapPressed(false);
    setisCablePressed(!isCablePressed);
    setisChainPressed(false)
  }

  useEffect(() => {
    console.log(equipments);
  }, [equipments])
  
  return (
    <>
      <div className="container">
        <h2>Lifting Calculator</h2>
        <div className="row">
          <ul id="nav-mobile" className="center">
              <li className="col s4"><button className="waves-effect waves-light btn-large" onClick={()=>toggleChain()}>Chain</button> </li>
              <li className="col s4"><button className="waves-effect waves-light btn-large" onClick={()=>toggleStrap()}>Strap</button></li>
              <li className="col s4"><button className="waves-effect waves-light btn-large" onClick={()=>toggleCable()}>Cable</button></li>
          </ul>
        </div>
      </div>
      {isChainPressed && <ChainForm />}
      {isStrapPressed && <StrapForm />}
      {isCablePressed && <CableForm />}
    </>
  )
}

export default LiftingCalculator
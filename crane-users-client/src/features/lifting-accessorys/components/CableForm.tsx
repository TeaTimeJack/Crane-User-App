import { useState, useEffect } from 'react';
import data from '../data/accesories.json'
import {capitalizeFirstLetter} from '../../../app/helpers.ts'
// import BigNumber from 'bignumber.js'

const CableForm = () => {
  const widths = data.chain.widths
    const numberOf = [1,2,3]
    const angles = data.angles
    const [currentWLL, setCurrentWLL] = useState(0)
    
    const [selectedWidth, setSelectedWidth] = useState<number>(0);
    const [selectedNumberOf, setSelectedNumberOf] = useState<number>(1);
    const [selectedAngle, setSelectedAngle] = useState<string>("straight");
    const [selectedAngleValue, setSelectedAngleValue] = useState<number>(1);


    const handleNumberOf = (num1:number)=>{
        if(num1 === 1){
            setSelectedNumberOf(num1),
            setSelectedAngle("straight")
            setSelectedAngleValue(1)
        }else if(num1 ===2){
            setSelectedNumberOf(num1),
            setSelectedAngle("under_90")
            setSelectedAngleValue(1.4)
        }else{
            setSelectedNumberOf(num1),
            setSelectedAngle("under_90")
            setSelectedAngleValue(2.1)
        } 
    }

    const handeleAngle = (str:string,num:number)=>{
        setSelectedAngle(str),
        setSelectedAngleValue(num)
    }

    useEffect(() => {   
        if(selectedAngle === "straight" ){
            console.log("witdthVal",selectedWidth,"numberOf",selectedNumberOf)
            setCurrentWLL(selectedWidth * selectedNumberOf)
        }else{
            // setSelectedAngleValue(selectedNumberOf)
            // const a:any= new BigNumber(selectedWidth)
            // const b:any= new BigNumber(selectedAngleValue)
            // const result = a.multipliedBy(b)
            setCurrentWLL(selectedWidth * selectedAngleValue)
            console.log("witdthVal",selectedWidth,"angle",selectedAngleValue);
        }

    }, [selectedWidth,selectedNumberOf,selectedAngle])
  return (
    <div>
                <table className="centered">
                    <thead>
                        <tr>
                            <td colSpan={1 + (widths ? widths.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                                <h3>Select the information of the CABLE</h3>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={1 + (widths ? widths.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                                <span>Current WLL of the CABLE: {currentWLL} KG</span>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Width (m"m)</td>
                            {widths && widths.map((item) =>{
                                const isSelected = item.value === selectedWidth; 
                                return(
                                    <td key={item.mm}>
                                        <button onClick={()=>setSelectedWidth(item.value)} className={isSelected? "btn teal": "btn grey"}>{item.mm}</button>
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td>Width (Inch)</td>
                            {widths && widths.map((item) =>{
                                const isSelected = item.value === selectedWidth; 
                                return(
                                    <td key={item.inch}>
                                        <button onClick={()=>setSelectedWidth(item.value)} className={isSelected? "btn teal": "btn grey"}>{item.inch}</button>
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td>Number Of Chains on the Sling</td>
                            {numberOf && numberOf.map((item) =>{
                                 const isSelected = item === selectedNumberOf;
                                return(
                                    <td key={item}>
                                        <button onClick={()=>handleNumberOf(item)} className={isSelected? "btn teal": "btn grey"}>{item ===3? "3+":item}</button>
                                    </td>
                                )
                            })}
                        </tr>
                        <tr>
                            <td>What is the Sling Angle</td>
                            {angles && angles.map((item) =>{
                                const isSelected = item.name === selectedAngle;
                                const amountIndex = item.arr.findIndex(a => a.amount === selectedNumberOf)
                                if(amountIndex === -1){
                                    return
                                }
                                return(
                                    <td key={item.name}>
                                        <button onClick={()=>handeleAngle(item.name,item.arr[amountIndex].value)} className={isSelected? "btn teal ": "btn grey"}>{capitalizeFirstLetter(item.name)}</button>
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>           
        </div>
  )
}

export default CableForm

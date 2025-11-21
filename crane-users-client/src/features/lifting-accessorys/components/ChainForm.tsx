import { useState, useEffect } from 'react';
import data from '../data/accesories.json'
import {capitalizeFirstLetter} from '../../../app/helpers.ts'




const ChainForm = () => {
    const widths = data.chain.widths
    const numberOf = [1,2,3]
    const angles = data.angles
    const [currentWLL, setCurrentWLL] = useState(0)
    
    const [selectedWidth, setSelectedWidth] = useState(0);
    const [selectedNumberOf, setSelectedNumberOf] = useState(1);
    const [selectedAngle, setSelectedAngle] = useState("straight");
    const [selectedAngleNum, setSelectedAngleNum] = useState(1);


    const handleNumberOf = (num1:number)=>{
        if(num1 === 1){
            setSelectedNumberOf(num1),
            setSelectedAngle("straight")
            setSelectedAngleNum(1)
        }else if(num1 ===2){
            setSelectedNumberOf(num1),
            setSelectedAngle("under 90")
            setSelectedAngleNum(1.4)
        }else{
            setSelectedNumberOf(num1),
            setSelectedAngle("under 90")
            setSelectedAngleNum(2.1)
        }
        
    }

    const handeleAngle = (str:string,num:number)=>{
        setSelectedAngle(str),
        setSelectedAngleNum(num)
    }

    useEffect(() => {
        
        if(selectedAngle === "straight" ){
            console.log("witdthVal",selectedWidth,"numberOf",selectedNumberOf)
            setCurrentWLL(selectedWidth * selectedNumberOf)
        }else{
            setSelectedAngleNum(selectedNumberOf)
            setCurrentWLL(selectedWidth * selectedAngleNum )
            console.log("witdthVal",selectedWidth,"angle",selectedAngleNum);
        }

    }, [selectedWidth,selectedNumberOf,selectedAngle])
    
  return (
    <div>
            <table>
                <thead>
                    <tr>
                        <td colSpan={1 + (widths ? widths.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                            <h3>Select the correct information of the Chain</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1 + (widths ? widths.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                            <span>Current WLL of the Chain: {currentWLL} KG</span>
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
                                    <button onClick={()=>setSelectedWidth(item.value)} style={{width: '100%', backgroundColor: isSelected? '#4CAF50':"#1a1a1a"}}>{item.mm}</button>
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
                                    <button onClick={()=>setSelectedWidth(item.value)} style={{width: '100%', backgroundColor: isSelected? '#4CAF50':"#1a1a1a"}}>{item.inch}</button>
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
                                    <button onClick={()=>handleNumberOf(item)} style={{width: '100%', backgroundColor: isSelected? '#4CAF50':"#1a1a1a"}}>{item ===3? "3+":item}</button>
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
                                    <button onClick={()=>handeleAngle(item.name,item.arr[amountIndex].value)} style={{width: '100%', backgroundColor: isSelected? '#4CAF50':"#1a1a1a"}}>{capitalizeFirstLetter(item.name)}</button>
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>           
    </div>
  )
}

export default ChainForm


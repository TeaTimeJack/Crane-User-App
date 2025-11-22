import { useState, useEffect } from 'react';
import data from '../data/accesories.json'
import {capitalizeFirstLetter} from '../../../app/helpers.ts'
import straightKnotImg from '../../../assets/images/knotTypes/straight.jpg';
import chokeKnotImg from '../../../assets/images/knotTypes/choke.jpg';
import openHamekKnotImg from '../../../assets/images/knotTypes/open-hamek.jpg';
import closedHamekKnotImg from '../../../assets/images/knotTypes/closed-hamek.jpg';


const StrapForm = () => {
    const colors = data.strap.colors
    const numberOf =[1,2,3,4,5,6,7,8];
    const angles = data.angles;
    const knotsTypes = data.knotTypes
    const knotsIMG =[
        {name:"straight", image: straightKnotImg},
        {name:"choke", image: chokeKnotImg},
        {name:"open-hamek",  image: openHamekKnotImg},
        {name:"closed-hamek", image: closedHamekKnotImg}
    ]
    

  return (
    <div>
      <table>
        <thead>
            <tr>
                <td colSpan={1 + (colors ? colors.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                    <h3>Select the correct information of the Strap</h3>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Strap Color</td>
                {colors && colors.map((item) =>{
                    return(
                        <td key={item.color}>
                            <button style={{width: '100%'}}>{capitalizeFirstLetter(item.color)}</button>
                        </td>
                    )
                })}
            </tr>
            <tr>
                <td>Number Of Straps on the Sling</td>
                {numberOf && numberOf.map((item) =>{
                    return(
                        <td key={item}>
                            <button style={{width: '100%'}}>{item}</button>
                        </td>
                    )
                })}
            </tr>
            <tr>
                <td>Knot Type</td>
                {knotsTypes && knotsTypes.map((item) =>{

                    const imgIndex = knotsIMG.findIndex(img => item.name === img.name)
                    return(
                        <td key={item.name}>
                            <button style={{width: '100%'}}>{capitalizeFirstLetter(item.name)}<img src={knotsIMG[imgIndex].image}/></button>
                        </td>
                    )
                })}
            </tr>
            {/* <tr>
                <td>What is the Sling Angle</td>
                {angles && angles.map((item) =>{
                    return(
                        <td key={item}>
                            <button style={{width: '100%'}}>{item}</button>
                        </td>
                    )
                })}
            </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default StrapForm

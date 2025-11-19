

const StrapForm = () => {
    const colors =['1000\nPurple','2000\nGreen', '3000\nYellow', '4000\nGrey', '5000\nRed', '6000\nBrown', '8000\nBlue', '10000\nOrange'];
    const numberOf =[1,2,3,4,5,6,7,8];
    const angles = ["Straight", "Less then 90", "More then 90"]

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
                <td>Width (m"m/Inch)</td>
                {colors && colors.map((item) =>{
                    return(
                        <td key={item}>
                            <button style={{width: '100%'}}>{item}</button>
                        </td>
                    )
                })}
            </tr>
            <tr>
                <td>Number Of Chains on the Sling</td>
                {numberOf && numberOf.map((item) =>{
                    return(
                        <td key={item}>
                            <button style={{width: '100%'}}>{item}</button>
                        </td>
                    )
                })}
            </tr>
            <tr>
                <td>What is the Sling Angle</td>
                {angles && angles.map((item) =>{
                    return(
                        <td key={item}>
                            <button style={{width: '100%'}}>{item}</button>
                        </td>
                    )
                })}
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default StrapForm

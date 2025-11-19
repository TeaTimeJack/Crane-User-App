

const ChainForm = () => {
    const widths = ['7\n9/32','8\n5/16','10\n3/8','13\n1/2', '16\n5/8','19\n3/4','22\n7/8','25.4\n1','32\n1 1/4']
    const numberOf = [1,2,3,4]
    const angles = ["Straight", "Less then 90", "More then 90"]
  return (
    <div>
        <form>
            <table>
                <thead>
                    <tr>
                        <td colSpan={1 + (widths ? widths.length : 0)} style={{textAlign: 'center', fontWeight: 'bold'}}>
                            <h3>Select the correct information of the Chain</h3>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Width (m"m/Inch)</td>
                        {widths && widths.map((item) =>{
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
        </form>
    </div>
  )
}

export default ChainForm

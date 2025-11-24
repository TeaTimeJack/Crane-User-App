
const GovermentLinks = () => {
  return (
    <div className="row">
        <h3>Usfull Links</h3>
        <table className="highlight centered responsive-table">
            <thead>
            <tr>
                <th>Action</th>
                <th>Link</th>
                <th>Contact</th>
                <th>More Info</th>
            </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Show license </td>
                    <td><a className="btn" href="https://serviceproviders.labor.gov.il/Pages/Person.aspx" target="blank">To Link</a></td>
                    <td></td>
                    <td><p>Type in at least one input (prefer ID Num) to see your license</p></td>
                </tr>
            <tr>
                <td>Updating license</td>
                <td><a className="btn" href="https://www.gov.il/he/service/request-for-tower-or-mobile-crane-operators" target="blank">To Link</a></td>
                <td><p><i className="material-icons prefix">email</i>Eden.Zaken@labor.gov.il</p> <p><i className="material-icons prefix">phone</i>074-7696135</p> </td>
                <td><p><i className="material-icons prefix">face</i> Eden Zaken</p> <p><i className="material-icons prefix">phone</i> 074-7696130 - Secondery Phone</p>  <p><i className="material-icons prefix">access_time</i> On Tuesday 8:30 - 15:00</p> </td>
            </tr>
            
            <tr>
                <td>Crane Course</td>
                <td><a className="btn" href="https://www.cleo.co.il/%D7%A8%D7%A9%D7%99%D7%9E%D7%AA-%D7%9B%D7%9C-%D7%94%D7%A7%D7%95%D7%A8%D7%A1%D7%99%D7%9D/%D7%A7%D7%95%D7%A8%D7%A1%D7%99-%D7%9E%D7%A0%D7%95%D7%A4%D7%99%D7%9D-%D7%95%D7%9E%D7%9C%D7%92%D7%96%D7%95%D7%AA/" target="blank">To Link</a></td>
                <td>Handasa Bagova <br/><i className="material-icons prefix">phone</i> *5776</td>
                <td><p><i className="material-icons prefix">access_time</i>Service Open On:</p><p>Sunday to Thursday 8:00 - 21:00</p> <p>Friday 7:00 - 14:00</p> </td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default GovermentLinks

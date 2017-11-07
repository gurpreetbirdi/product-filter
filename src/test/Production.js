import React from 'react';
import ReactSelect from './ReactSelect';

class Production extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      customerList:[
        {name: 'FIAT', value: 'FIAT'},
        {name: 'FORD', value: 'FORD'},
        {name: 'MSIL', value: 'MSIL'},
        {name: 'GMI', value: 'GMI'},
        {name: 'HSCI', value: 'HSCI'},
        {name: 'HYUNDAI', value: 'HYUNDAI'},
        {name: 'MATE (DAIMLER)', value: 'MATE (DAIMLER)'},
        {name: 'NISSAN', value: 'NISSAN'},
        {name: 'NISSAN (JAPAN)', value: 'NISSAN (JAPAN)'},
        {name: 'NISSAN (MEXICO)', value: 'NISSAN (MEXICO)'},
        {name: 'NTF', value: 'NTF'},
        {name: 'POLYPLASTICS', value: 'POLYPLASTICS'},
        {name: 'TATA', value: 'TATA'},
        {name: 'TKML', value: 'TKML'},
        {name: 'TOYOTA', value: 'TOYOTA'},
        {name: 'U 215 (QUANTO)', value: 'U 215 (QUANTO)'},
        {name: 'XYLO (LOW SERIES)', value: 'XYLO (LOW SERIES)'}
      ]
    };
  }
  render(){
    return(
      <div>
        <form>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="customer">Customer</label><ReactSelect options={this.state.customerList} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Production;

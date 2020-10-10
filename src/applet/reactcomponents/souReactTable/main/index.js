import SouTable from 'sou-react-table';
import './index.less';
import React from "react";
import ReactDOM from 'react-dom'
class Table extends React.Component{
    constructor(){
        super();
        this.state = {
            tableDate:[]
        }
    }
    render() {
        return(
            <SouTable
                tableData={[
                    [ 'City', 'Beijing', 'Shanghai', 'Guangzhou' ],
                    [ 'Temperature', '5', '22', '29' ],
                    [ 'Weather', 'Windy', 'Sunny', 'Rainy' ],
                ]}
                width={600}
                height={600}
                minTableCol={10}
                minTableRow={21}
                minCellWidth={50}
                cellHeight={28}
                getData={function getData(data) {
                    console.log(data);
                }}/>
        )
    }
}

ReactDOM.render((
    <Table />
),document.getElementById('app'));


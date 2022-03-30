import React from 'react';
import './style.scss';

const DataTables = ({dataTables, columns}) => {
  return (
    <div className="dataTable-container">
      <table className="dataTables">
        <thead>
          <tr className="dtHeaderRow"><ShowHeader>{columns}</ShowHeader></tr>
        </thead>
        <tbody><ShowData columns={columns}>{dataTables}</ShowData></tbody>
      </table>
    </div>
  )
}
const ShowHeader = (props) => {
  const columns = props.children;
  const result = columns.map((column, index) => (
    <th className="dtHeader" key={index}>{column.title}</th>
  ))
  return (
    <>{result}</>
  )
}

const Cell = ({ column, record }) => {
  var key = column.key
  var style = {
    textAlign: column.textAlign ? column.textAlign : "",
    minWidth: column.minWidth ? column.minWidth : "",
  };

  if(key){
    return (<td style={style} className="dtTableCell">{record[key]}</td>)
  }else{
    var action = column.Content;
    return (<td style={style} className="dtTableCell actionCell">{action(record.dgd_id)}</td>)
  }
}
const Record = ({ columns, recordData }) => {
  var result = columns.map((column, index) => (<Cell key={index} column={column} record={recordData} />))
  return (<tr className="dtTableRow">{result}</tr>);
}
const ShowData = ({ columns, children }) => {
  var datas = children;
  var result = datas.map((record, index) => (<Record key={index} columns={columns} recordData={record} />))
  return (<>{result}</>);
}
export default DataTables;

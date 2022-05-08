import React from 'react';
import './style.scss';

export default function DataTables ({dataTables, columns, idKey}) {
  return (
    <div className="dataTable-container">
      <table className="dataTables">
        <thead>
          <tr className="dtHeaderRow"><ShowHeader>{columns}</ShowHeader></tr>
        </thead>
        <tbody><ShowData columns={columns} idKey={idKey}>{dataTables}</ShowData></tbody>
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

const Cell = ({ column, record, idKey }) => {
  var key = column.key
  var style = {
    textAlign: column.textAlign ? column.textAlign : "",
    minWidth: column.minWidth ? column.minWidth : "",
    maxWidth: column.maxWidth ? column.maxWidth : "",
  };

  if(key){
    return (<td style={style} className="dtTableCell">{record[key]}</td>)
  }else{
    var action = column.Content;
    return (<td style={style} className="dtTableCell actionCell">{action(record[idKey])}</td>)
  }
}
const Record = ({ columns, recordData, idKey }) => {
  var result = columns.map((column, index) => (<Cell key={index} column={column} idKey={idKey} record={recordData} />))
  return (<tr className="dtTableRow">{result}</tr>);
}
const ShowData = ({ columns, children, idKey }) => {
  var datas = children;
  var result = datas.map((record, index) => (<Record key={index} columns={columns} idKey={idKey} recordData={record} />))
  return (<>{result}</>);
}

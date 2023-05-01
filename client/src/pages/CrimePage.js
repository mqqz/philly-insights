import React  from 'react';
import { useState, useEffect } from 'react';
import { useTable } from 'react-table'

export default function CrimePage() {
    // get points from server api/points
    const [crimeByTypeData, setCrimeByTypeData] = useState([]);


    const crimeByTypeColumns = [
        {
          Header: 'Crime Type',
          accessor: 'crime_type',
        },
        {
          Header: 'Crime Count',
          accessor: 'crime_count'
        }
      ];

    const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
    useEffect(() => {
        fetch(endpoint + '/api/crimeByType')
            .then(res => res.json())
            .then(data => {
                setCrimeByTypeData(data);
            });
    }, []);

    
    const tableInstance = useTable({
        crimeByTypeColumns,
        crimeByTypeData
    });
 
    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = tableInstance;
    return (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
       )
}
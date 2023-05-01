import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';


import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const columns = [
  { title: 'Block', field: 'location_block' },
  { title: 'Crime type', field: 'text_general_code' },
  { title: 'Crime Count', field: 'crime_count', type: 'numeric' },
  { 
    title: 'Average Value', 
    field: 'avg_value', 
    type: 'numeric',
    render: (rowData) => {
      // create a formatter object for US dollar
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
      });
      // return the formatted value with a dollar sign
      return formatter.format(rowData.avg_value);
    }
  },
    { title: 'Crime Value Ratio', field: 'crime_value_ratio', type: 'numeric' }  

];

export default function CrimeToBlockTable() {
  return (
    <div style={{ maxWidth: '100%' }}>
          <MaterialTable
            icons={tableIcons}
              columns={columns}
              data={query =>
                new Promise((resolve, reject) => {
                  let url = 'http://localhost:8000/api/crimeToPropertyValueRatio?per_page=' + query.pageSize + '&page=' + (query.page + 1);
                  fetch(url)
                    .then(response => response.json())
                      .then(result => {
                        console.log(result);
                      resolve({
                        data: result,
                          page: query.page,
                            totalCount: 31,
                      })
                    })
                })
              }
              title="Highest Ratios of Crime Count (by type) to Property Value (Average by Block)"
            />
          </div>
        );
      }
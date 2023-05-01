
import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';


export default function DispatchTimeTable(){
    
    const [data, setData] = useState([]);

    const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
    useEffect(() => {
        fetch(endpoint + '/api/blockDispatchTime')
            .then(res => res.json())
          .then(data => {
                setData(data);
            });
    }, []);

    const columns = useMemo(
        () => [
          {
            accessorKey: 'location_block',
            header: 'Block',
          },
          {
            accessorKey: 'text_general_code',
            header: 'Crime Type',
            filterFn: 'equals',
            filterSelectOptions: [
              { text: 'Aggravated Assault Firearm', value: 'Aggravated Assault Firearm' },
              { text: 'Aggravated Assault No Firearm', value: 'Aggravated Assault No Firearm' },
              { text: 'All Other Offenses', value: 'All Other Offenses' },
              { text: 'Arson', value: 'Arson' },
              { text: 'Burglary Non-Residential', value: 'Burglary Non-Residential' },
              { text: 'Burglary Residential', value: 'Burglary Residential' },
              { text: 'Disorderly Conduct', value: 'Disorderly Conduct' },
              { text: 'Drunk Driving', value: 'DRIVING UNDER THE INFLUENCE' },
              { text: 'Embezzlement', value: 'Embezzlement' },
              { text: 'Forgery and Counterfeiting', value: 'Forgery and Counterfeiting' },
              { text: 'Fraud', value: 'Fraud' },
              { text: 'Gambling Violations', value: 'Gambling Violations' },
              { text: 'Homicide - Criminal', value: 'Homicide - Criminal' },
              { text: 'Homicide - Gross Negligence', value: 'Homicide - Gross Negligence' },
              { text: 'Homicide - Justifiable', value: 'Homicide - Justifiable' },
              { text: 'Liquor Law Violations', value: 'Liquor Law Violations' },
              { text: 'Motor Vehicle Theft', value: 'Motor Vehicle Theft' },
              { text: 'Narcotic / Drug Law Violations', value: 'Narcotic / Drug Law Violations' },
              { text: 'Offenses Against Family and Children', value: 'Offenses Against Family and Children' },
              { text: 'Other Assaults', value: 'Other Assaults' },
              { text: 'Other Sex Offenses (Not Commercialized)', value: 'Other Sex Offenses (Not Commercialized)' },
              { text: 'Prostitution and Commercialized Vice', value: 'Prostitution and Commercialized Vice' },
              { text: 'Public Drunkenness', value: 'Public Drunkenness' },
              { text: 'Rape', value: 'Rape' },
              { text: 'Receiving Stolen Property', value: 'Receiving Stolen Property' },
              { text: 'Recovered Stolen Motor Vehicle', value: 'Recovered Stolen Motor Vehicle' },
              { text: 'Robbery Firearm', value: 'Robbery Firearm' },
              { text: 'Robbery No Firearm', value: 'Robbery No Firearm' },
              { text: 'Theft from Vehicle', value: 'Theft from Vehicle' },
              { text: 'Thefts', value: 'Thefts' },
              { text: 'Vagrancy/Loitering', value: 'Vagrancy/Loitering' },
              { text: 'Vandalism/Criminal Mischief', value: 'Vandalism/Criminal Mischief' },
              { text: 'Weapon Violations', value: 'Weapon Violations' },
            ],
            filterVariant: 'select',
          },
          {
            accessorKey: 'avg_dispatch_time',
            header: 'Average Dispatch Time (min)',
            filterVariant: 'range'
          }
        ],
        [],
      );

return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true }} //show filters by default
      muiTableHeadCellFilterTextFieldProps={{
        sx: { m: '0.5rem 0', width: '100%' },
        variant: 'outlined',
      }}
    />
);
}

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CustomScrollbar from './CustomScrollbar';
import { useState, useEffect } from 'react';
import { MenuItem, FormControl, InputLabel, Select, Button, ListItemIcon, TextField, Box } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const blockOptions = [
    { text: 'Parking lot', value: 'PKG LOT' },
    { text: 'Auto Repair Shop', value: 'AUTO REPAIR SHOP' },
    { text: 'Amusement', value: 'AMUSE' },
    { text: 'Vacant land', value: 'VACANT LAND' },
    { text: 'Cemetary', value: 'CEMETERY' },
    { text: 'Masonry', value: 'MASONRY' },
    { text: 'Apartment', value: 'APT' },
    { text: 'Industry', value: 'INDUS' },
    { text: 'Condo', value: 'CONDO' },
  ];
  
const fetchData = async (marketLimit, locationLimit, buildingType, startIdx, endIdx) => {
    let url = '';
    if (!marketLimit[0] && !locationLimit && !buildingType) {
        url = 'http://localhost:8000/api/property';
    } else {
        const marketUrl = marketLimit[0] ? `marketValue=${marketLimit[0]},${marketLimit[1]}` : '';
        const locationurl = locationLimit ? `location=${locationLimit}` : '';
        const buildingTypeUrl = buildingType ? `buildingType=${buildingType}` : '';
        const allLimits = [marketUrl, locationurl, buildingTypeUrl].filter((x) => x !== '');
        url = `http://localhost:8000/api/property?${allLimits.join('&')}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const PropertyTable = () => {
    const [rows, setRows] = useState([]);
    const [marketValueRange, setMarketValueRange] = useState([100000, 500000]);
    const [locationLimit, setLocationLimit] = useState('');
    const [buildingType, setBuildingType] = useState('');
    const [isMVEnabled, setIsMVEnabled] = useState(false);
    const [page, setPage] = useState(1);
    const [allRows, setAllRows] = useState([]);
    const rowsPerPage = 5;

    const handleRangeChange = (value) => {
        setMarketValueRange(value);
    };

    const handleLocationChange = (event) => {
        setLocationLimit(event.target.value);
    };

    const handleBuildingChange = (event) => {
        setBuildingType(event.target.value);
    };

    const handleBuildingClear = () => {
        setBuildingType('');
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // Initial loading of the table
    useEffect(() => {
        const callingFetch = async () => {
          const inputMVLimit = isMVEnabled ? marketValueRange : [];
          const data = await fetchData(inputMVLimit, locationLimit, buildingType);
          setAllRows(data);
        }
        callingFetch();
    }, [marketValueRange, locationLimit, buildingType, isMVEnabled]);

    useEffect(() => {
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        setRows(allRows.slice(startIdx, endIdx));
    }, [page, allRows, marketValueRange, locationLimit, buildingType, isMVEnabled]);

    return (
      <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '2rem', marginBottom: '20px' }}>
      <h1 className="text-3xl font-bold text-center mb-8">Property Page</h1>
        <div>
          <CustomScrollbar
            title="Market Value filter"
            upperLimit={2000000}
            lowerLimit={0}
            initialValue={[100000, 500000]}
            isRange
            onChange={handleRangeChange}
            isEnabled={isMVEnabled}
            setIsEnabled={setIsMVEnabled}
         />
         <Box sx={{ width: '95%', margin: '0 auto'}}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="crime-type-label" sx={{ fontSize: '1rem' }}>Building Type Filter</InputLabel>
            <Select
              labelId="crime-type-label"
              id="crime-type-select"
              value={buildingType}
              onChange={handleBuildingChange}
              MenuProps={{
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
              },
              getContentAnchorEl: null,
              }}
            >
              <MenuItem>
          <ListItemIcon>
            <Button variant="outlined" size="small" onClick={handleBuildingClear}>
              Clear
            </Button>
          </ListItemIcon>
        </MenuItem>
              {blockOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
              </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: '95%', margin: '0 auto', marginTop: '10px', marginBottom: '15px', height: '50px' }}>
          <TextField
            fullWidth
            label="Location Filter"
            value={locationLimit}
            onChange={handleLocationChange}
            variant='outlined'
            size="small"
          />
        </Box>
        </div>
          <Table stickyHeader aria-label="custom table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Property ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Market Value</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Building Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.object_id}>
                  <TableCell component="th" scope="row">
                    {row.object_id}
                  </TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.market_value}</TableCell>
                  <TableCell align="right">{row.building_code_description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Stack spacing={2} justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(allRows.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
      </TableContainer>
    );
  };
  
  export default PropertyTable;
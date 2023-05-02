import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    ListItemIcon,
    Box,
    Typography,
    Slider,
    Grid,
    Switch,
  } from '@mui/material';import Pagination from '@mui/material/Pagination';
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
  
const fetchData = async (count, ascending, buildingType) => {
    let url = '';
    const countUrl = `count=${count}`;
    const buildingTypeUrl = buildingType ? `buildingType=${buildingType}` : '';
    const ascendingUrl = `ascending=${ascending}`;
    const allLimits = [ascendingUrl, countUrl, buildingTypeUrl].filter((x) => x !== '');
    url = `http://localhost:8000/api/propertyByValueSorted?${allLimits.join('&')}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const PropertyValueTable = () => {
    const [rows, setRows] = useState([]);
    const [buildingType, setBuildingType] = useState('');
    const [page, setPage] = useState(1);
    const [allRows, setAllRows] = useState([]);
    const rowsPerPage = 5;
    const [count, setCount] = useState(10);
    const [ascending, setAscending] = useState(false);

    const handleBuildingChange = (event) => {
        setBuildingType(event.target.value);
    };

    const handleBuildingClear = () => {
        setBuildingType('');
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleCountSliderChange = (event, newValue) => {
        setCount(newValue);
    };

    // Initial loading of the table
    useEffect(() => {
        const callingFetch = async () => {
          const data = await fetchData(count, ascending, buildingType);
          setAllRows(data);
        }
        callingFetch();
    }, [count, ascending, buildingType]);

    useEffect(() => {
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        setRows(allRows.slice(startIdx, endIdx));
    }, [page, allRows, buildingType, ascending, count]);

    return (
        <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '2rem', marginBottom: '20px' }}>
      <h1 className="text-3xl font-bold text-center mb-8">Property Sorted By Value </h1>
        <div>
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
        <Grid container spacing={2} sx={{marginLeft: '15px', marginTop: '10px'}}>
        {/* Ascending switch */}
        <Grid item>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Ascending:
          </Typography>
          <Switch
            checked={ascending}
            onChange={(event) => setAscending(event.target.checked)}
            color="primary"
          />
        </Grid>

        {/* Count slider */}
        <Grid item>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Count:
          </Typography>
          <Slider
            defaultValue={10}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={50}
            onChange={handleCountSliderChange}
            sx={{ width: 150 }}
          />
        </Grid>
      </Grid>
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
  
  export default PropertyValueTable;
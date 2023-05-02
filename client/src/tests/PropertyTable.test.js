import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PropertyTableModule, { fetchData } from '../components/PropertyTable';
import React from 'react';

const PropertyTable = PropertyTableModule.default;

jest.mock('../components/PropertyTable', () => {
    const actualModule = jest.requireActual('../components/PropertyTable');
    return {
      ...actualModule,
      fetchData: jest.fn(),
    };
  });

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('PropertyTable Component', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue([]);
  });

  afterEach(() => {
    fetch.mockClear();
  });

  test('renders PropertyTable component', () => {
    render(<PropertyTable />);
    expect(screen.getByText('Property Page')).toBeInTheDocument();
  });

  test('fetchData function is called on component mount', async () => {
    render(<PropertyTable />);
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  test('changing Building Type Filter', () => {
    render(<PropertyTable />);
    const buildingTypeFilter = screen.getByLabelText(/Building Type Filter/i);
    expect(buildingTypeFilter).toBeInTheDocument();
    userEvent.selectOptions(buildingTypeFilter, 'MASONRY');
    expect(buildingTypeFilter).toHaveValue('MASONRY');
  });

  test('changing Location Filter', () => {
    render(<PropertyTable />);
    const locationFilter = screen.getByLabelText(/Location Filter/i);
    expect(locationFilter).toBeInTheDocument();
    fireEvent.change(locationFilter, { target: { value: 'Sample Location' } });
    expect(locationFilter).toHaveValue('Sample Location');
  });

  test('clicking the Clear button in Building Type Filter', () => {
    render(<PropertyTable />);
    const clearButton = screen.getByText(/Clear/i);
    const buildingTypeFilter = screen.getByLabelText(/Building Type Filter/i);
    userEvent.selectOptions(buildingTypeFilter, 'MASONRY');
    userEvent.click(clearButton);
    expect(buildingTypeFilter).toHaveValue('');
  });

  test('changing page in pagination', () => {
    fetchData.mockResolvedValue(new Array(10).fill({
      object_id: '1',
      location: 'Sample Location',
      market_value: 100000,
      building_code_description: 'MASONRY',
    }));

    render(<PropertyTable />);
    const pagination = screen.getByRole('navigation');
    const page2 = within(pagination).getByText('2');
    fireEvent.click(page2);
    expect(page2).toHaveClass('Mui-selected');
  });
});

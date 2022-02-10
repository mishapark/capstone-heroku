import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


function createData(name, type, issueDate) {
  return {
    name,
    type,
    issueDate
  };
}

let rows = [

];

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Product Name',
  },
  {
    id: 'active',
    numeric: false,
    label: 'Compliance Active (Yes/No)',
  },
  {
    id: 'documents',
    numeric: false,
    label: 'Documents',
  },
  
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
  
          <TableCell
            key={headCell.id}
          >
          {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Compliance Center
        </Typography>
        
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

export default function Compliance() {
  const [products, setProducts] = React.useState([])


  React.useEffect(()=> {
    rows =[]
    fetch('http://humber-capstone-backend.herokuapp.com/products').then((response) => response.json().then((responseData) => 
    responseData.map((r) => rows.push(createData(r["product_details"]["product_name"], " ", "  ")))))
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
            />
            <TableBody>
              {rows.map((row) => {
                return (
                    <TableRow
                    >
                      <TableCell
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.issueDate}</TableCell>
                      
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
    </Box>
  );
}
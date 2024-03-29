import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch
} from "@mui/material";
import { Delete, FilterList, Sync as Refresh } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const generateHeadCells = (rows) => {
  if (! rows?.length > 0) return [];
  return (Object.keys(rows[0]))
    .filter(key => key[0] !== '_')
    .map((key) => {
      return {
        id: key,
        numeric: typeof rows[key] === "number",
        disablePadding: true,
        label: key
          .replaceAll("_", " ")
          .split(" ")
          .map((word) => (word[0] ? word[0] : '').toUpperCase() + word.slice(1))
          .join(" ")
      };
    }
  );
};

function DataTableHead(props) {

  const {
    headCells, 
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

DataTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function DataTableToolbar(props) {
  const { numSelected, metricsPort, refreshURIList, workspaceId, searchQuery, setSearchQuery, handleSearchChange } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box component="div"
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Endpoints
            </Typography>
          </Box>
          <Box component="div"
            sx={{
              width: "fit-content"
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearchChange={handleSearchChange}
            />
          </Box>
          <Box component="div"
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Tooltip title="Refresh List">
            <IconButton
              onClick={() => {
                // getURIListFromServer(props.metricsPort)
                refreshURIList(workspaceId, metricsPort);
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        
        </>
      )}

    </Toolbar>
  );
}

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function URITable(props) {

  const {
    workspaceId,
    name,
    domain,
    port,
    metricsPort,
    rows,
    getURIListFromServer,
    updateTrackingInDatabaseById,
    refreshURIList,
    isMonitoring,
    setIsMonitoring
  } = props;

  const headCells = generateHeadCells(rows);

  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const filterBySearchQuery = (unfilteredRows, searchQuery = "") => {
    return unfilteredRows.filter((row) => {
      return (
        Object.keys(row || {})
        .filter(columnName => columnName[0] !== '_')
        .some(column => row[column].toString().toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })
  }

  const navigate = useNavigate();
  
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("path");
  const [selected, setSelected] = React.useState(rows.filter((row) => row.tracking));
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, identifier) => {
    const selectedIndex = selected.indexOf(identifier);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, identifier);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (identifier) => selected.indexOf(identifier) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <DataTableToolbar 
          numSelected={selected.length} 
          getURIListFromServer={getURIListFromServer}
          metricsPort={metricsPort}
          refreshURIList={refreshURIList}
          workspaceId={workspaceId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <DataTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {filterBySearchQuery(stableSort(rows, getComparator(order, orderBy)), searchQuery)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={crypto.randomUUID()}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          // checked={isItemSelected}
                          checked={row._tracking}
                          inputProps={{
                            "aria-labelledby": labelId
                          }}
                          onClick={() => {
                            row.tracking = ! row._tracking
                            const newRow = Object.assign({}, {
                              method: row.method,
                              path: row.path,
                              tracking: row.tracking,
                              _id: row._id,
                            })
                            try {
                              updateTrackingInDatabaseById(newRow)
                            } catch (err1) {
                              console.error(err1);
                              try {
                                updateTrackingInDatabaseByRoute(newRow)
                              }
                              catch (err2) {
                                console.error(err2);
                              }
                            }
                          }}
                        />
                      </TableCell>

                      {Object.keys(row)
                        .filter(key => key[0] !== '_')
                        .map((column) => {
                          return (
                            <TableCell 
                              key={crypto.randomUUID()}
                              align="left"
                              onClick={() => {
                                if (column === "simulation" || column === "open") return;
                                navigate(`/dashboard/${row._id}`, { state: {
                                  workspaceId,
                                  name,
                                  domain,
                                  port,
                                  metricsPort,
                                  endpointId: row._id,
                                  method: row.method,
                                  path: row.path,
                                  isMonitoring,
                                }})
                              }}
                              sx={{ cursor: "pointer" }}
                            >
                              {row[column]}
                            </TableCell>
                          );
                        })
                      }

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} color="secondary" />}
        label="Compact view"
      /> */}
    </Box>
  );
}

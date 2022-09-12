import {GridColDef} from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
    sortable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
    sortable: true,

  },
  {
    field: 'room',
    headerName: 'Rooms',
    type: 'string',
    width: 110,
    editable: false,
    sortable: true,

  },
  {
    field: 'program',
    headerName: 'Programs',
    width: 160,
    sortable: true,
  },
  {
    field: 'dateOfBirth',
    headerName: 'dateOfBirth',
    type: 'date',
    width: 160,
    sortable: false,
  },
  {
    field: 'startDate',
    headerName: 'startDate',
    type: 'date',
    width: 160,
    sortable: false,
  },
  // {field: 'id', headerName: 'ID', width: 90},
];
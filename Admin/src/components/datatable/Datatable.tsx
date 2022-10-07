import React from 'react'
import "./datatable.css"
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { listenerCount } from 'process';
import { Button } from '@mui/material';

const Datatable = ({columns}) => {
  // SAME PATH 
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  // TO BRING DATA TO LIST FOR DELETING
  const [list, setList] = useState<any[]>([]);
  const { data, loading, error } = useFetch(`http://localhost:8005/api/${path}`     );

  useEffect(() => {
    setList(data);
  }, [data]);
   
  const navigate = useNavigate()
  const editdata=(id:any)=>{
     navigate(`/${path}/useredit`,{state:{data:id}})
  }

  const handleDelete = async (id) => {
    
    try {
      await axios.delete(`http://localhost:8005/api/${path}/${id}`,{headers:{isAdmin:localStorage.getItem('user')}});
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={`/users/useredit`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link> */}
            <Button className='deleteButton' onClick={()=>editdata(params.row._id)}>Edit</Button>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            > Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>{
        list&& <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
        getRowId={(row) => row._id}
      />

}
      
    </div>
  );
};

export default Datatable;
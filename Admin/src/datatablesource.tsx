import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
export const userColumns = [
 

    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      // to use React hooks inside your renderer, you should wrap them inside a component. 
      renderCell: (params   ,  user) => {
        return (
          <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"      ||           `${user?.result?.googleId ?user?.result?.username:user.username}`    } alt="avatar" />
          {params.row.username}
        </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
  ];
  
  export const hotelColumns = [

    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      // to use React hooks inside your renderer, you should wrap them inside a component. 
      renderCell: (params:any) => {
        return (
       
          <div className="cellWithImg">
           { console.log(params,"hf")}
         {params.row && <img className="cellImg" src={params.row.photos && params.row.photos[0]|| "https://i.ibb.co/MBtjqXQ/no-avatar.gif"                                 } alt="avatar" />}
          {params?.row?.name}

     

        </div>


        
        );
      },
    },
  
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
  ];
  
  export const roomColumns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
      width: 100,
    },
  ];
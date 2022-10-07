import { useEffect, useReducer } from "react";

import { createContext,  } from "react";

const INITIAL_STATE = {
 user:JSON.parse(localStorage.getItem("user")) ,
 loading:false ,
 error: null ,

  };


export const AuthContext = createContext<any|undefined>(INITIAL_STATE);

const AuthReducer = (state:any, action:any) =>   {
  switch (action.type) {
   case "LOGIN_START":
    return{
      user:null ,
      loading:true ,
      error: null ,

    };
    case "LOGIN_SUCCESS":
      return{
        user:action.payload ,
        loading:false ,
        error: null ,
  
      };
      case "LOGIN_FAILURE":
        return{

         
            user:null ,
            loading:false ,
            error: action.payload ,
      
          
        }
        case "LOGOUT":
        
        return{
          user:null ,
          loading:false ,
          error: null ,
    
        };
    


    default:
      return state ;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
        console.log("State",state);

       
        // @typescript-eslint/no-unused-expressions
        useEffect(()=>{
             localStorage.setItem("user" , JSON.stringify(state.user))
        },[state.user])


  return(
    
    <AuthContext.Provider value={{
      user:state.user , 
    loading:state.loading ,
     error:state.error,
     dispatch ,
     }}>
    {children}
    </AuthContext.Provider>
  );
  

 
};



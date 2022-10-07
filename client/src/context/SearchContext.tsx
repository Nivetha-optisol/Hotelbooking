import { useReducer } from "react";

import { createContext,  } from "react";

const INITIAL_STATE = {
  city: JSON.parse(window.sessionStorage.getItem("key"))?JSON.parse(window.sessionStorage.getItem("key")).city:undefined,
  dates:JSON.parse(window.sessionStorage.getItem("key"))?JSON.parse(window.sessionStorage.getItem("key")).dates: [],
  options:JSON.parse(window.sessionStorage.getItem("key"))?JSON.parse(window.sessionStorage.getItem("key")).options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext<any|undefined>(INITIAL_STATE);

const SearchReducer = (state, action) =>   {
  switch (action.type) {
    
    case "NEW_SEARCH":
    
      return action.payload;  
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
        console.log("State",state);
  return(
    
    <SearchContext.Provider value={{city:state.city , 
    dates:state.dates?state.dates:[],
     options:state.options,
     dispatch ,
     }}>
    {children}
    </SearchContext.Provider>
  )
  

 
};



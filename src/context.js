import React, { createContext, useContext, useState } from 'react'


export const AppContext = React.createContext({})


const DataContext = createContext()

export const DataProvider = ({children}) => {
   const [data, setData] = useState()

   const setValues = (values) => {
      setData(prevData => ({
         ...prevData,
         ...values,
      }))
      
      if(values.user) {
         if(localStorage.getItem('react_user')) {
            localStorage.removeItem('react_user')
            localStorage.setItem('react_user', JSON.stringify(values))
         } else {
            localStorage.setItem('react_user', JSON.stringify(values))
         }
      }
      
      
   }
   
      
   
   
   return <DataContext.Provider value={{data, setValues}}>
      {children}
   </DataContext.Provider>
}

export const useData = () => useContext(DataContext)
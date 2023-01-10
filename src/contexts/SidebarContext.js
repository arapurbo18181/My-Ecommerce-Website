import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = (props) => {

  const [IsOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  }

  return(
    <SidebarContext.Provider value={{IsOpen, setIsOpen, handleClose}}>
      {props.children}
    </SidebarContext.Provider>
  )
};

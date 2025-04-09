'use client'
import React, { ReactNode, useState } from 'react'
import NavBar from '../components/navigation/NavBar'
import SideBar from '../components/navigation/SideBar'
interface Props {
  children: ReactNode
}
const App = ({ children }: Props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <>
      <NavBar setIsSideBarOpen={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={toggleSideBar} />
      <div className="p-4 sm:ml-12" onClick={() => setIsSideBarOpen(false)}>
        {children}
      </div>
    </>
  )
}
export default App

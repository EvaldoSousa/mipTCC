'use client'
import React, { ReactNode } from 'react'
type FooProps = {
  name: string
  icon: ReactNode
  onClick: Function
  thisRoute: boolean
}
const SideBarItem = (props: FooProps) => {
  return (
    <li>
      <div
        className={`flex items-center p-2 cursor-pointer text-gray-900 rounded-lg hover:bg-gray-100 ${
          props.thisRoute ? 'bg-green-100' : 'bg-white'
        } `}
        onClick={() => props.onClick()}
      >
        {props.icon}
        <span className="flex-1 ml-3 whitespace-nowrap text-sm font-normal">
          {props.name}
        </span>
      </div>
    </li>
  )
}

export default SideBarItem

import React from 'react'

type NavProps={
  title:string
}

const NavItem = ({title}:NavProps) => {
  return (
    <div>{title}</div>
  )
}

export default NavItem
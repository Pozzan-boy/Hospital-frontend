import React from 'react'
import "./list.scss"
const List = ({children}) => {
  return (
    <div className='list'>
      {children}
    </div>
  )
}

export default List

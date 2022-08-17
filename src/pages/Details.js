import React from 'react'
import { useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();

  return (
    <div>Details: {id}</div>
  )
}

export default Details
import React from 'react'

const ArchiveLayoutPage = ({archive,latest}) => {
  return (
    <div>
        <h1>News Archive</h1>
        <section id='archive-filter'>{archive}</section>
        <section id='archive-latest'>{latest}</section>
    </div>
  )
}

export default ArchiveLayoutPage
import React from 'react'

const List = ({ people, handleRemove }) => {
  return (
    <>
      {people.map((person) => {
        const { id, name, age, image } = person
        return (
          <article key={id} className='person'>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} yesrs</p>
              <h4 style={{ color: '#ca1f1f' }} onClick={() => handleRemove(id)}>
                Remove
              </h4>
            </div>
          </article>
        )
      })}
    </>
  )
}

export default List

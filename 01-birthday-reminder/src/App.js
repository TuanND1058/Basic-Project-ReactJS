import React, { useState } from 'react'
import data from './data'
import List from './List'
function App() {
  const [people, setPeople] = useState(data)

  const reset = () => {
    setPeople(data)
  }

  const handleRemove = (id) => {
    let newPeople = people.filter((person) => person.id !== id)
    setPeople(newPeople)
  }

  return (
    <main>
      <section className='container'>
        <h3>{people.length} Birthday today</h3>
        <List people={people} handleRemove={handleRemove} />
        <button onClick={() => setPeople([])}>Clear All</button>
        <button onClick={reset}>Reset</button>
      </section>
    </main>
  )
}

export default App

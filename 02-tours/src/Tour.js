import React, { useState } from 'react'

const Tour = ({ id, image, price, name, removeTour }) => {
  const [readMore, setReadMore] = useState(false)
  const info =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit similique qui repellendus corporis aut officia debitis fugit optio rerum odio eaque beatae totam numquam, ullam, error sunt molestiae aspernatur quod? Possimus ea libero, velit reprehenderit quos modi tenetur quaerat nisi ducimus magni esse. Minus id optio vero quod pariatur similique, eum ad maxime delectus eos sint odit est repudiandae ullam facere distinctio molestias nostrum, nesciunt suscipit eligendi. Obcaecati beatae tempore commodi unde quaerat optio cumque eius natus ipsa porro. Dolorum laudantium iure vero? Fuga corrupti recusandae architecto neque aut modi ut aliquam rem debitis, expedita esse, praesentium explicabo laborum consectetur!'
  return (
    <article className='single-tour'>
      <img src={image} alt={name} />
      <footer>
        <div className='tour-info'>
          <h4>{name}</h4>
          <h4 className='tour-price'>${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'show less' : 'read more'}
          </button>
        </p>
        <button className='delete-btn' onClick={() => removeTour(id)}>
          Not interested
        </button>
      </footer>
    </article>
  )
}

export default Tour

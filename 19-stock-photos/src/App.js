import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const mounted = useRef(false)
  const [newImage, setNewImage] = useState(false)

  const fetchImage = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setNewImage(false)
      setLoading(false)
    } catch (error) {
      setNewImage(false)
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImage()
  }, [page])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImage) {
      return
    }
    if (loading) {
      return
    }
    setPage((oldPage) => oldPage + 1)
  }, [newImage])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImage(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) {
      return
    }
    if (page === 1) {
      fetchImage()
    }
    setPage(1)
  }

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((image) => {
            return <Photo key={image.id} {...image} />
          })}
        </div>
        {loading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  )
}

export default App

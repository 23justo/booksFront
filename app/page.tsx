'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Book = {
  id: number
  author_id: number
  status: string
  year: number
  title: string
}

type Author = {
  id: number
  name: string
}

export default function Page() {
  const [filter, setFilter] = useState("")
  const [books, setBooks] = useState<Book[]>([])
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    getAuthors()
    getBooks()
  }, [])

  const getAuthors = async () => {
    const { data } = await axios.get('https://blonde-lissy-justo-1382e3ae.koyeb.app/authors')
    setAuthors(data) 
  }

  const getBooks = async () => {
    const { data } = await axios.get('https://blonde-lissy-justo-1382e3ae.koyeb.app/books')
    setBooks(data)
  }
    
  const deleteBook = async (book: Book) => {
    await axios.put('https://blonde-lissy-justo-1382e3ae.koyeb.app/books/' + book.id, {
      title: book.title,
      year: book.year,
      author_name: book.author_id ? authors.find((author) => author.id === book.author_id)?.name : null,
      author_id: book.author_id,
      status: "PUBLISHED"
    })
    await getAuthors()
    await getBooks()
    alert('Book deleted successfully')
  }

  return (
    <div className="w-screen flex justify-center my-20">
      <div className="h-auto w-1/2 bg-gray-100 p-8 rounded-xl shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Books
          </h1>
          <div>
            <label>Search author</label>
            <input className="border border-gray-400 rounded-xl p-0.5 ml-2" onChange={(e) => setFilter(e.target.value)} />
          </div>
          <Link href="/book/new" className="bg-green-400 hover:bg-green-500 transition-all px-4 py-2 rounded-xl shadow-xl">
            New Book
          </Link>
        </div>
        <ul>
          {books.filter(book => book.status !== 'PUBLISHED').filter(book => {
            const author = authors.find(author => author.id === book.author_id)?.name
            return author?.toLowerCase().includes(filter.toLowerCase())
          }).map((book) => (
            <li key={book.id} className=" p-2 rounded-xl my-4 shadow-sm flex flex-col bg-gray-200">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-lg font-bold">{book.title}</h2>
                
                <div className="flex gap-2 mb-2">
                  <Link href={`book/${book.id}`} className="bg-blue-200 px-2 py-1 rounded-xl">
                    Edit
                  </Link>
                  <button onClick={() => deleteBook(book)} className="bg-red-200 px-2 py-1 rounded-xl">
                    Delete
                  </button>
                </div>
              </div>
              <div className="border-t p-2 border-black w-full flex flex-col">
                <p>By {authors.find(author => author.id === book.author_id)?.name}</p>
                <p>Year of Publication: {book.year}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

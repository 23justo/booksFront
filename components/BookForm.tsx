'use client'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  title: string | undefined
  year: string | undefined
  author: string | undefined
  authorName: string | undefined
}

type Author = {
  id: number
  name: string
}

type Props = {
  book: {
    id: number
    author_id: number
    status: string
    year: number
    title: string
  } | undefined
  edit: boolean | undefined
}

const BookForm = ({ book, edit }: Props) => {
  const [authors, setAuthors] = useState<Author[]>([])
  const [newAuthor, setNewAuthor] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Inputs>({
    defaultValues: {
      title: book?.title,
      year: book?.year,
      author: book?.author_id
    }
  })

  useEffect(() => {
    getAuthors()
  }, [])

  useEffect(() => {
    if (edit) {
      setValue('author', book.author_id)
    }
  }, [authors, edit])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      title: data.title,
      year: parseInt(data.year),
      author_name: newAuthor ? data.authorName : authors.find((author) => author.id === parseInt(data.author))?.name,
      author_id: newAuthor ? null : parseInt(data.author),
      status: "DRAFT"
    }
    let response
    if (edit) {
      response = await axios.put('https://blonde-lissy-justo-1382e3ae.koyeb.app/books/' + book.id, body)
    } else {
      response = await axios.post('https://blonde-lissy-justo-1382e3ae.koyeb.app/books', body)
    }
    console.log(response)
    if (response.status === 201) {
      alert('Book created successfully')
      redirect('/')
    }
    if (response.status === 204) {
      alert('Book updated successfully')
      redirect('/')
    }
  }

  const getAuthors = async () => {
    const { data } = await axios.get('https://blonde-lissy-justo-1382e3ae.koyeb.app/authors')
    setAuthors(data)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-auto w-1/2 bg-gray-100 p-8 rounded-xl shadow-xl">
        <h1 className="text-xl font-bold">
          New Book
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
          <label className="block">Title</label>
            <input className="border border-gray-400 rounded-xl p-2 w-full" {...register("title", { required: true })} />
            <p className="text-sm text-red-500">{errors.title && 'You must enter a title'}</p>

          </div>
          <div className='mb-4'>
            <label className="block">Year</label>
            <input className="border border-gray-400 rounded-xl p-2 w-full" {...register("year", { required: true })} />
            <p className="text-sm text-red-500">{errors.year && 'You must enter a year'}</p>
          </div>
          {
            newAuthor ? (
              <div className="mb-4">
                <label className="block">Author Name</label>
                <input className="border border-gray-400 rounded-xl p-2 w-full" {...register("authorName", { required: newAuthor })} />
                <p className="text-sm text-red-500">{errors.authorName && 'You must enter an author name'}</p>
                <div>
                  <p onClick={() => setNewAuthor(false)} className="mt-1 text-sm text-blue-600 hover:text-blue-500 underline cursor-pointer w-fit">Select an author</p>
                </div>
              </div>
            ) : (
                <div className='mb-4'>
                  <label className="block">Author</label>
                  <select className="border border-gray-400 rounded-xl p-2 w-full" {...register("author", { required: !newAuthor })} >
                    <option value="">Select an author</option>
                    {authors.map((author) => (
                      <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                  </select>
                  <p className="text-sm text-red-500">{errors.author && 'You must select an author'}</p>
                  <div>
                    <p onClick={() => setNewAuthor(true)} className="mt-1 text-sm text-blue-600 hover:text-blue-500 underline cursor-pointer w-fit">Add new author</p>
                  </div>
                </div>
            )
          }
          <div className="flex justify-end">
            <button className="bg-green-400 hover:bg-green-500 transition-all px-4 py-2 rounded-xl shadow-xl">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookForm
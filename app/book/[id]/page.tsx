import BookForm from "@/components/BookForm"

type Book = {
  id: number
  author_id: number
  status: string
  year: number
  title: string
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const booksData = await fetch('https://blonde-lissy-justo-1382e3ae.koyeb.app/books') 
  const books: Book[] = await booksData.json()

  return (
    <div>
      {
        (books.find((book) => book.id === parseInt(id)) ? (
          <BookForm book={books.find((book) => book.id === parseInt(id))} edit />
        ) : (
          <h1>Book not found</h1>
        ))
      }
    </div>
  )
}
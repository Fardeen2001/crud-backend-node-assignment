import express from "express";
import allBooks from "./constants.js";
const app = express();
app.use(express.json());
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

app.get("/books", (req, res) => {
  res.status(200).json(allBooks);
});

app.get("/books/:id", (req, res) => {
  const book = allBooks.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found");
  }
  return res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (title && author) {
    const book = {
      id: allBooks.length + 1,
      title: title,
      author: author,
    };
    allBooks.push(book);
    res.status(201).send({
      success: true,
      message: "Book added successfully",
      book,
    });
  } else {
    res.status(401).send({
      success: false,
      message: "please enter book data correctly",
      errors: [
        {
          field: "title",
          message: "cannot be null",
        },
        {
          field: "author",
          message: "cannot be null",
        },
      ],
    });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookIndex = allBooks.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );
  if (bookIndex === -1) {
    return res.status(404).send("Book not found");
  }
  //allBooks = allBooks.filter((book) => book.id !== parseInt(req.params.id));
  allBooks.splice(bookIndex, 1);

  res.status(200).send({
    success: true,
    message: "Book deleted successfully",
  });
});

app.put("/books/:id", (req, res) => {
  const { title, author } = req.body;
  const book = allBooks.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send("Book not found");
  }
  book.title = title;
  book.author = author;
  res.status(200).send({
    success: true,
    message: "Book updated successfully",
    book,
  });
});

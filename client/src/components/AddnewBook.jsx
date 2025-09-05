import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addBook } from "../service/api";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
  }
`;

const templateBook = {
  name: "",
  author: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  quantity: 0,
  rating: 0,
};

const AddnewBook = () => {
  const [book, setBook] = useState(templateBook);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBookDetails = async () => {
    if (
      book.name === "" ||
      book.author === "" ||
      book.description === "" ||
      book.published === "" ||
      book.language === "" ||
      book.pages === "" ||
      book.price === "" ||
      book.image === "" ||
      book.category === "" ||
      book.quantity === "" ||
      book.isbn === "" ||
      book.rating === ""
    ) {
      return;
    }
    await addBook(book);
    navigate("/dashboard/all");
  };

  return (
    <Container>
      <Typography variant="h4">Add Book</Typography>

      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>

      <FormControl>
        <InputLabel>Author</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="author" />
      </FormControl>

      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input
          type="text"
          onChange={(e) => onValueChange(e)}
          name="description"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Published</InputLabel>
        <Input
          type="number"
          onChange={(e) => onValueChange(e)}
          name="published"
        />
      </FormControl>

      <FormControl>
        <InputLabel>Language</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="language" />
      </FormControl>

      <FormControl>
        <InputLabel>Pages</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="pages" />
      </FormControl>

      <FormControl>
        <InputLabel>Price</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="price" />
      </FormControl>

      <FormControl>
        <InputLabel>Image</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="image" />
      </FormControl>

      <FormControl>
        <InputLabel>Category</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="category" />
      </FormControl>

      <FormControl>
        <InputLabel>Quantity</InputLabel>
        <Input
          type="number"
          onChange={(e) => onValueChange(e)}
          name="quantity"
        />
      </FormControl>

      <FormControl>
        <InputLabel>ISBN</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="isbn" />
      </FormControl>

      <FormControl>
        <InputLabel>Rating</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="rating" />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => addBookDetails()}>
          Add New Book
        </Button>
        <Button>
          <Link to="/dashboard">Back</Link>
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddnewBook;

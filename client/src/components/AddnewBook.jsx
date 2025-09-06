import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addBook,
  addLanguage,
  addCategory,
  getLanguages,
  getCategories,
} from "../service/api";
import { useEffect } from "react";

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
  status: "available",
};

const AddnewBook = () => {
  const [book, setBook] = useState(templateBook);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await getCategories();
      if (catRes && catRes.data) setCategories(catRes.data || []);

      const langRes = await getLanguages();
      if (langRes && langRes.data) setLanguages(langRes.data || []);
    };
    fetchData();
  }, []);

  const onValueChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "") return;
    const res = await addCategory({ name: newCategory });
    setCategories([...categories, res.data]);
    setBook({ ...book, category: res.data.name });
    setNewCategory("");
  };

  const handleAddLanguage = async () => {
    if (newLanguage.trim() === "") return;
    const res = await addLanguage({ name: newLanguage });
    setLanguages([...languages, res.data]);
    setBook({ ...book, language: res.data.name });
    setNewLanguage("");
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
    navigate("/dashboard/searchbook");
  };

  const addNewLanguage = async () => {
    await addLanguage(newLanguage);
    alert("Language added successfully");
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
        <Select
          name="language"
          value={book.language || ""}
          onChange={onValueChange}
        >
          {languages.map((lang, index) => (
            <MenuItem
              key={lang._id || `${lang.name}-${index}`}
              value={lang.name}
            >
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Add New Language</InputLabel>
        <Input
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
        />
        <Button
          onClick={handleAddLanguage}
          variant="outlined"
          style={{ marginTop: 10 }}
        >
          Add Language
        </Button>
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
        <Select
          name="category"
          value={book.category || ""}
          onChange={onValueChange}
        >
          {categories.map((cat, index) => (
            <MenuItem key={cat._id || `${cat.name}-${index}`} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Add New Category</InputLabel>
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button
          onClick={handleAddCategory}
          variant="outlined"
          style={{ marginTop: 10 }}
        >
          Add Category
        </Button>
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

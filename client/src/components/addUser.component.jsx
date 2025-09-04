import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../service/api";

import bcrypt from "bcryptjs";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
} from "@mui/material";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
  }
`;

const templateUser = {
  name: "",
  username: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  repassword: "",
};

const AddUser = () => {
  const [user, setUser] = useState(templateUser);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    if (
      user.name === "" ||
      user.username === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.role === "" ||
      user.password === "" ||
      user.repassword === ""
    ) {
      return;
    }

    if (user.password !== user.repassword) {
      alert("Passwords do not match!");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const userToSend = { ...user, password: hashedPassword };
    delete userToSend.repassword;

    await addUser(userToSend);

    navigate("/all");
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>

      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>

      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="username" />
      </FormControl>

      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input type="email" onChange={(e) => onValueChange(e)} name="email" />
      </FormControl>

      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="phone" />
      </FormControl>

      <FormControl>
        <InputLabel>Role</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="role" />
      </FormControl>

      <FormControl>
        <InputLabel>Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="password"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Re-Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="repassword"
        />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => addUserDetails()}>
          Add New User
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;

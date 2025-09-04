import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  styled,
  Link,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
  }
`;

const templateUser = {
  password: "",
  newpassword: "",
  repassword: "",
};

const PasswordReset = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [password, setPassword] = useState(templateUser);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  if (!storedUser) {
    console.error("No user found in localStorage");
  }

  const onValueChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!storedUser) {
      setMessage("You must be logged in to change password");
      return;
    }

    // Optional frontend validation before sending
    if (password.newpassword !== password.repassword) {
      setMessage("New passwords do not match");
      return;
    }
    if (password.password === password.newpassword) {
      setMessage("New password cannot be the same as current password");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/change-password",
        {
          email: storedUser.email,
          ...password,
        }
      );

      setMessage(response.data.message);
      setPassword(templateUser);
      navigate("/all");
    } catch (error) {
      console.error("Change password error:", error);

      // ✅ Display proper message from backend
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message); // e.g. "Current password is incorrect"
      } else {
        setMessage("Something went wrong. Check console.");
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Change password</Typography>

      <FormControl>
        <InputLabel>Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="password"
        />
      </FormControl>
      <FormControl>
        <InputLabel>New Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="newpassword"
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
        <Button variant="contained" onClick={handleSubmit}>
          Send
        </Button>
        <Button>
          <Link href="/all">Back</Link>
        </Button>
      </FormControl>
    </Container>
  );
};

export default PasswordReset;

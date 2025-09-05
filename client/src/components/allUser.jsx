import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../service/api.js";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from "@mui/material";
const StyledTable = styled(Table)`
  width: 70%;
  margin: 150px auto 0 auto;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 17px;
    color: #000000;
  }
`;

const TBody = styled(TableRow)`
  & > td {
    font-size: 15px;
  }
`;

const TCell = styled(TableCell)`
  text-align: center;
`;

const AllUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await getUsers();
    if (res && res.data) {
      setUsers(res.data);
    } else {
      setUsers([]);
    }
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  return (
    <>
      <StyledTable>
        <TableHead>
          <THead>
            <TCell>Name</TCell>
            <TCell>Username</TCell>
            <TCell>Email</TCell>
            <TCell>Phone</TCell>
            <TCell>Role</TCell>
            <TCell>Settings</TCell>
          </THead>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TBody key={user._id}>
              <TCell>{user.name}</TCell>
              <TCell>{user.username}</TCell>
              <TCell>{user.email}</TCell>
              <TCell>{user.phone}</TCell>
              <TCell>{user.role}</TCell>
              <TCell>
                <Button
                  color="secondary"
                  variant="outlined"
                  style={{ marginRight: 15 }}
                  component={Link}
                  to={`/dashboard/user/${user._id}`}
                >
                  Profile
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ marginRight: 15 }}
                  component={Link}
                  to={`/dashboard/${user._id}`}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => deleteUserData(user._id)}
                >
                  Delete
                </Button>
              </TCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default AllUser;

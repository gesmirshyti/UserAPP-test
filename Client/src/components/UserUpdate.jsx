import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function UserUpdate() {
  const { id } = useParams(); 
  const [updated, setUpdated] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [role, setRole] = useState(""); 
  const navigate = useNavigate();
  const [isTeacherOptionDisabled, setIsTeacherOptionDisabled] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setImageURL(res.data.imageURL);
        setRole(res.data.role); 
      })
      .catch((err) => console.log(err));
  }, [id]); 

  const updateUsers = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/users/edit/${id}`, {
        name,
        email,
        password,
        imageURL,
        role,
      })
      .then((res) => {
        console.log(res);
        navigate("/users/list");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={updateUsers}>
      <TextField
        label="Name"
        variant="outlined"
        name="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
      />
      <hr />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <hr />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <hr />
      <TextField
        label="Image URL"
        variant="outlined"
        name="imageUrl"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
        fullWidth
      />
      <hr />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isTeacherOptionDisabled}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>
      </FormControl>
      <hr />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

import React, { useState,useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';


const UserForm = () => {

  const [ updated, setUpdated ] = useState();
  // const{users,setUsers} =props;
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  // const [dob ,setDob]= useState();
  const[ password,setPassword] = useState("");
  const [imageURL, setImageURL] =useState("");
  const [role,setRole] =useState('student')
  const navigate = useNavigate();
  const [isTeacherOptionDisabled, setIsTeacherOptionDisabled] = useState(false);


  useEffect(() => {
    axios
      .get('http://localhost:8000/users/teacher-count')
      .then((res) => {
        const teacherCount = res.data.teacherCount;
        setIsTeacherOptionDisabled(teacherCount >= 1);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/users",{
      name,
      email,
      password,
      // dob,
      role,
      imageURL
    })
    .then((res)=>{
      console.log(res.data);
      setUpdated(!updated);
      navigate('/users/list');
    })
    .catch((err)=>console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        name="Name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
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
        onChange={(e)=> setEmail(e.target.value)}
        required
        fullWidth
      /><hr />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        required
        fullWidth
      /><hr />
      <TextField
        label="Image URL"
        variant="outlined"
        name="imageUrl"
        value={imageURL}
        onChange={(e)=> setImageURL(e.target.value)}
        fullWidth
      /><hr />
{/* <DatePicker
  label="Date of Birth"
  value={dob}
  onChange={(e)=> setDob(e.target.value)}
/>
<TextField

      fullWidth
      variant="outlined"
      InputLabelProps={{ shrink: true }} 
    /> <hr /> */}
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={role}
          onChange={(e)=> setRole(e.target.value)}
          disabled={isTeacherOptionDisabled}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>
      </FormControl><hr />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function UserList(props){
    const[users,setUsers] =useState();
    const[updated , setUpdated] =useState(false);
    useEffect(() => {
            axios
        .get('http://localhost:8000/users')
        .then((res) => {
            console.log('Data received:', res.data);
            setUsers(res.data);
        })
        .catch((err) => console.error(err));
    }, [updated]);
    

    const deleteUser = (id, role) => {
        axios
          .delete(`http://localhost:8000/users/${id}`)
          .then(async (res) => {
            console.log(res.data);
            setUpdated(!updated);
    
            if (role === "teacher") {
              const students = users.filter((user) => user.role === "student");
    
              if (students.length > 0) {
                const randomStudent = students[Math.floor(Math.random() * students.length)];
                const updatedStudent = {
                  ...randomStudent,
                  role: "teacher",
                };
    
                await axios.patch(`http://localhost:8000/users/edit/${randomStudent._id}`, updatedStudent);
                setUpdated(!updated);
              }
            }
          })
          .catch((err) => console.log(err));
      };

    return(
        <div>
        {users &&
          users.map((user, index) => (
            <div key={index}>
              <Link to={`/users/${user._id}`}>{user.name} </Link>
              <hr />
              <Link to={`/users/edit/${user._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={(e) => deleteUser(user._id,user.role)}>Delete</button>
              {user.imageURL && ( // Check if imageURL exists before rendering
                <img
                  src={user.imageURL}
                  alt={`User ${user.name}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }} // Adjust size as needed
                />
              )}
               {user.role === "teacher" && (
              <button>Teacher</button>
            )}
            </div>
          ))}
      </div>
    )

}
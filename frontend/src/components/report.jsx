import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./studentForm"; 


const Report = () => {
  const [data, setData] = useState([]);
  const [addStudents, setAddStudents] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/select`);
    setData(res.data);
  };

  const handleDelete = async (stId) => {
    await axios.delete(`http://localhost:3000/delete/${stId}`);
    fetchData();
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setAddStudents(true);
  };

  const handleUpdate = () => {
    setEditStudent(null);
    setAddStudents(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Report of students</h1>

      {addStudents ? (
        <StudentForm
          fetchData={fetchData}
          editStudent={editStudent}
          onUpdate={handleUpdate}
          onCancel={() => {
            setAddStudents(false);
            setEditStudent(null);
          }}
        />
      ) : (
        <>
          <button onClick={() => setAddStudents(true)}>Add students</button>
          <table border="1">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student GitHub Account</th>
                <th>Student Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.stId}>
                  <td>{item.stId}</td>
                  <td>{item.stName}</td>
                  <td>{item.stEmail}</td>
                  <td>{item.stGitHub_account}</td>
                  <td>{item.stAdress}</td>
                  <td>
                    <button onClick={() => handleDelete(item.stId)}>DELETE</button>
                    <button onClick={() => handleEdit(item)}>MODIFY</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Report;

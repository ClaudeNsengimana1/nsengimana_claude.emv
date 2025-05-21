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
          <button onClick={() => setAddStudents(true)}>Add Package</button>
          <table border="1">
            <thead>
              <tr>
                <th>PackageName</th>
                <th>PackageDescription</th>
                <th>PackagePrice</th>
          
               <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.PackageNumber}>
                 <td>{item.PackageName}</td>
                  <td>{item.PackageDescription}</td>
                  <td>{item.PackagePrice}</td>
    
                  <td>
                    <button onClick={() => handleDelete(item.PackageNumber)}>DELETE</button>
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

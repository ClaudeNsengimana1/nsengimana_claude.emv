import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentForm = ({ fetchData, editStudent, onUpdate, onCancel }) => {
  const [stName, setStName] = useState("");
  const [stEmail, setStEmail] = useState("");
  const [stGitHub_account, setStGitHub_account] = useState("");
  const [stAdress, setStAdress] = useState("");

  useEffect(() => {
    if (editStudent) {
      setStName(editStudent.stName);
      setStEmail(editStudent.stEmail);
      setStGitHub_account(editStudent.stGitHub_account);
      setStAdress(editStudent.stAdress);
    } else {
      setStName("");
      setStEmail("");
      setStGitHub_account("");
      setStAdress("");
    }
  }, [editStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editStudent) {
        // Update logic
        await axios.put(`http://localhost:3000/update/${editStudent.stId}`, {
          stName,
          stEmail,
          stGitHub_account,
          stAdress,
        });
        onUpdate();
      } else {
        // Add logic
        await axios.post(`http://localhost:3000/insert`, {
          stName,
          stEmail,
          stGitHub_account,
          stAdress,
        });
        fetchData();
        onCancel(); // To go back to list
      }
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <div>
      <h2>{editStudent ? "Update Student" : "Add Student"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={stName}
          onChange={(e) => setStName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Student Email"
          value={stEmail}
          onChange={(e) => setStEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="GitHub Account"
          value={stGitHub_account}
          onChange={(e) => setStGitHub_account(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Address"
          value={stAdress}
          onChange={(e) => setStAdress(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">{editStudent ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default StudentForm;

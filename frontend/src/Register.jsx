import React, { useState } from 'react';

const Register = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate success if all fields are filled
    if (form.name && form.email && form.password) {
      onSuccess(); // 🔔 this shows the "Registered Successfully" popup
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">Register</h5>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Register</button>
    </form>
  );
};

export default Register;

import React, { useState } from 'react';

const Register = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      try {
        const res = await fetch('https://api-scraper-backend.onrender.com/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.success) {
          setShowSuccess(true); // ✅ Show popup
          setTimeout(() => {
            setShowSuccess(false); // ✅ Hide popup
            onSuccess(); // ✅ Continue flow (open login etc.)
          }, 2000); // show for 2 seconds
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Something went wrong. Try again.');
      }
    }
  };

  return (
    <>
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

      {/* ✅ Success Popup */}
      {showSuccess && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="text-success mb-3">
                <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-success">Registered Successfully!</h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;

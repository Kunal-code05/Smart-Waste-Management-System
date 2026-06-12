import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms state
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '', location: '' });
  const [newPickup, setNewPickup] = useState({ address: '', scheduledDate: '' });
  //for assign staff
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({
    username: '',
    email: '',
    password: ''
  });

  //edit 
  const [editingStaff, setEditingStaff] = useState(null);

  const [editForm, setEditForm] = useState({
    username: '',
    email: ''
  });
  //dashboard 
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  // const fetchData = async () => {
  //   try {
  //     const compRes = await axios.get('http://localhost:8081/api/complaints');
  //     const pickRes = await axios.get('http://localhost:8081/api/pickups');
  //     setComplaints(compRes.data);
  //     setPickups(pickRes.data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {

      const compRes = await axios.get(
        'http://localhost:8081/api/complaints'
      );

      const pickRes = await axios.get(
        'http://localhost:8081/api/pickups'
      );

      setComplaints(compRes.data);
      setPickups(pickRes.data);

      if (user.role === 'ROLE_ADMIN') {

        const staffRes = await axios.get(
          'http://localhost:8081/api/admin/staff'
        );

        setStaffList(staffRes.data);

        const statsRes = await axios.get(
          'http://localhost:8081/api/admin/stats'
        );

        setStats(statsRes.data);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // asign staff
  const handleAssignStaff = async (complaintId, staffId) => {
    try {
      await axios.put(
        `http://localhost:8081/api/complaints/${complaintId}/assign?staffId=${staffId}`
      );

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };

  //ad staff
  const handleAddStaff = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:8081/api/admin/staff',
        newStaff
      );

      setNewStaff({
        username: '',
        email: '',
        password: ''
      });

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteStaff = async (id) => {
    try {

      await axios.delete(
        `http://localhost:8081/api/admin/staff/${id}`
      );

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };
  //edit
  const handleUpdateStaff = async () => {
    try {

      await axios.put(
        `http://localhost:8081/api/admin/staff/${editingStaff.id}`,
        editForm
      );

      setEditingStaff(null);

      fetchData();

    } catch (err) {
      console.error(err);
    }
  };
  const handleCreateComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/complaints', newComplaint);
      setNewComplaint({ title: '', description: '', location: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePickup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/pickups', newPickup);
      setNewPickup({ address: '', scheduledDate: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusUpdate = async (type, id, status) => {
    try {
      const url = type === 'complaint'
        ? `http://localhost:8081/api/complaints/${id}/status`
        : `http://localhost:8081/api/pickups/${id}/status`;
      await axios.put(url, { status });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container">
        <h1 style={{ marginBottom: '2rem', color: 'var(--primary-dark)' }}>
          {user.role === 'ROLE_ADMIN' ? 'Admin Dashboard' : user.role === 'ROLE_STAFF' ? 'Staff Dashboard' : 'Citizen Dashboard'}

        </h1>

        {/* DASHBOARD CARDS HERE */}
        {user.role === 'ROLE_ADMIN' && stats && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '15px',
              marginBottom: '30px'
            }}
          >
            <div className="card">
              <h3>Total Users</h3>
              <h1>{stats.totalUsers}</h1>
            </div>

            <div className="card">
              <h3>Total Staff</h3>
              <h1>{stats.totalStaff}</h1>
            </div>

            <div className="card">
              <h3>Total Citizens</h3>
              <h1>{stats.totalCitizens}</h1>
            </div>

            <div className="card">
              <h3>Total Complaints</h3>
              <h1>{stats.totalComplaints}</h1>
            </div>

            <div className="card">
              <h3>Pending Complaints</h3>
              <h1>{stats.pendingComplaints}</h1>
            </div>

            <div className="card">
              <h3>Resolved Complaints</h3>
              <h1>{stats.resolvedComplaints}</h1>
            </div>
          </div>
        )}
        {/* ADMIN SECTION */}
        {user.role === "ROLE_ADMIN" && (
          <>
            {/* STAFF SECTION */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "350px 1fr",
                gap: "25px",
                marginBottom: "30px",
                alignItems: "start"
              }}

            //className="admin-layout"

            >
              {/* ADD STAFF CARD */}
              <div className="card">
                <h2
                  style={{
                    marginBottom: "20px",
                    color: "#059669"
                  }}
                >
                  ➕ Add Staff
                </h2>

                <form onSubmit={handleAddStaff}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Username"
                      value={newStaff.username}
                      onChange={(e) =>
                        setNewStaff({
                          ...newStaff,
                          username: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Email"
                      value={newStaff.email}
                      onChange={(e) =>
                        setNewStaff({
                          ...newStaff,
                          email: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Password"
                      value={newStaff.password}
                      onChange={(e) =>
                        setNewStaff({
                          ...newStaff,
                          password: e.target.value
                        })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%"
                    }}
                  >
                    Add Staff
                  </button>
                </form>
              </div>

              {/* STAFF MANAGEMENT */}
              <div className="card">
                <h2
                  style={{
                    marginBottom: "20px",
                    color: "#0f172a"
                  }}
                >
                  👨‍💼 Staff Management
                </h2>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse"
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#f8fafc"
                      }}
                    >
                      <th style={{ padding: "15px" }}>ID</th>
                      <th style={{ padding: "15px" }}>Username</th>
                      <th style={{ padding: "15px" }}>Email</th>
                      <th style={{ padding: "15px" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffList.map((staff) => (
                      <tr key={staff.id}>
                        <td
                          style={{
                            padding: "15px",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          {staff.id}
                        </td>

                        <td
                          style={{
                            padding: "15px",
                            borderBottom: "1px solid #e5e7eb",
                            fontWeight: "600"
                          }}
                        >
                          {staff.username}
                        </td>

                        <td
                          style={{
                            padding: "15px",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          {staff.email}
                        </td>

                        <td
                          style={{
                            padding: "15px",
                            borderBottom: "1px solid #e5e7eb"
                          }}
                        >
                          <div style={{ display: "flex", gap: "10px" }}>

                            <button
                              onClick={() => {
                                setEditingStaff(staff);

                                setEditForm({
                                  username: staff.username,
                                  email: staff.email
                                });
                              }}
                              style={{
                                background: "#2563eb",
                                color: "white",
                                border: "none",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                cursor: "pointer"
                              }}
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDeleteStaff(staff.id)}
                              style={{
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                cursor: "pointer"
                              }}
                            >
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {staffList.length === 0 && (
                  <p
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#64748b"
                    }}
                  >
                    No Staff Found
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* 
        <div className="card" style={{ marginTop: "30px" }}>
          <h2
            style={{
              marginBottom: "20px",
              color: "#0f172a"
            }}
          >
            🚛 Pickup Requests
          </h2>

          {pickups.length === 0 ? (
            <p>No pickup requests found.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                gap: "20px"
              }}
            >
              {pickups.map((pickup) => (
                <div
                  key={pickup.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "20px",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "12px"
                    }}
                  >
                    <h4>Pickup #{pickup.id}</h4>

                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background:
                          pickup.status === "SCHEDULED"
                            ? "#dbeafe"
                            : "#dcfce7",
                        color:
                          pickup.status === "SCHEDULED"
                            ? "#2563eb"
                            : "#16a34a"
                      }}
                    >
                      {pickup.status}
                    </span>
                  </div>

                  <p style={{ marginBottom: "10px" }}>
                    📍 <strong>Address:</strong>
                    <br />
                    {pickup.address}
                  </p>

                  <p style={{ marginBottom: "15px" }}>
                    📅 <strong>Date:</strong>{" "}
                    {pickup.scheduledDate}
                  </p>

                  {pickup.status === "SCHEDULED" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          "pickup",
                          pickup.id,
                          "COMPLETED"
                        )
                      }
                      className="btn btn-primary"
                      style={{
                        width: "100%"
                      }}
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div> */}
        {user.role === 'ROLE_CITIZEN' && (
          <div className="grid grid-cols-2" style={{ marginBottom: '3rem' }}>
            <div
              className="card"
              style={{
                marginBottom: '30px',
                padding: '25px',
                borderRadius: '15px',
                background: '#fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ marginBottom: '1.5rem' }}>Report a Garbage Issue</h3>
              <form onSubmit={handleCreateComplaint}>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Title" value={newComplaint.title} onChange={e => setNewComplaint({ ...newComplaint, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Location" value={newComplaint.location} onChange={e => setNewComplaint({ ...newComplaint, location: e.target.value })} required />
                </div>
                <div className="form-group">
                  <textarea className="form-input" placeholder="Description" value={newComplaint.description} onChange={e => setNewComplaint({ ...newComplaint, description: e.target.value })} required rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Report</button>
              </form>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>Schedule a Pickup</h3>
              <form onSubmit={handleCreatePickup}>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Full Address" value={newPickup.address} onChange={e => setNewPickup({ ...newPickup, address: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="date" className="form-input" value={newPickup.scheduledDate} onChange={e => setNewPickup({ ...newPickup, scheduledDate: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary">Schedule</button>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2">
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Complaints</h3>
            {complaints.length === 0 ? <p>No complaints found.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {complaints.map(c => (
                  <div key={c.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>{c.title}</strong>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        background: c.status === 'PENDING' ? '#fef3c7' : '#dcfce7',
                        color: c.status === 'PENDING' ? '#b45309' : '#15803d'
                      }}>
                        {c.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>📍 {c.location}</p>
                    {/* <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{c.description}</p> */}

                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                      {c.description}
                    </p>

                    <p
                      style={{
                        marginBottom: '12px',
                        fontWeight: '600'
                      }}
                    >
                      👨‍🔧 Assigned Staff:
                      <span
                        style={{
                          color: c.assignedStaff
                            ? '#16a34a'
                            : '#dc2626'
                        }}
                      >
                        {c.assignedStaff
                          ? ` ${c.assignedStaff.username}`
                          : ' Not Assigned'}
                      </span>
                    </p>
                    {user.role === 'ROLE_ADMIN' && !c.assignedStaff && (
                      <div style={{ marginBottom: '1rem' }}>
                        <select
                          className="form-input"
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAssignStaff(c.id, e.target.value);
                            }
                          }}
                        >
                          <option value="">Assign Staff</option>

                          {staffList.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                              {staff.username}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && c.status === 'PENDING' && (
                      <button onClick={() => handleStatusUpdate('complaint', c.id, 'RESOLVED')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Pickup Requests</h3>
            {pickups.length === 0 ? <p>No pickup requests found.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pickups.map(p => (
                  <div key={p.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '1.1rem' }}>📅 {p.scheduledDate}</strong>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px',
                        fontSize: '0.875rem',
                        background: p.status === 'SCHEDULED' ? '#e0f2fe' : '#dcfce7',
                        color: p.status === 'SCHEDULED' ? '#0369a1' : '#15803d'
                      }}>
                        {p.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>📍 {p.address}</p>

                    {(user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') && p.status === 'SCHEDULED' && (
                      <button onClick={() => handleStatusUpdate('pickup', p.id, 'COMPLETED')} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        Mark as Completed
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {editingStaff && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              zIndex: 100000
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              Edit Staff
            </h2>

            <input
              type="text"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  username: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />

            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value
                })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "6px"
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px"
              }}
            >
              <button
                onClick={handleUpdateStaff}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Save
              </button>

              <button
                onClick={() => setEditingStaff(null)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};

export default Dashboard;

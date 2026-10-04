import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [teams, setTeams] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Classroom creation state
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [file, setFile] = useState(null);
  
  // Classroom assignment state
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');

  // Faculty assignment state
  const [assignFacTeamId, setAssignFacTeamId] = useState('');
  const [assignFacId, setAssignFacId] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/dashboard`);
      if (statsRes.data.success) setStats(statsRes.data.data);
      
      const facultyRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/faculty`);
      if (facultyRes.data.success) setFaculty(facultyRes.data.data);

      const teamsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/teams`);
      if (teamsRes.data.success) setTeams(teamsRes.data.data);

      const classroomsRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/classrooms`);
      if (classroomsRes.data.success) setClassrooms(classroomsRes.data.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const verifyFaculty = async (id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/faculty/${id}/verify`);
      if (res.data.success) {
        alert("Faculty verified successfully!");
        fetchData();
      }
    } catch (err) {
      alert("Error verifying faculty");
    }
  };

  const updateFacultyStatus = async (id, status) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/faculty/${id}/status`, { status });
      if (res.data.success) {
        alert(`Faculty status updated to ${status}`);
        fetchData();
      }
    } catch (err) {
      alert("Error updating faculty status");
    }
  };

  const createClassroom = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/classrooms`, {
        name: roomName,
        venue: 'Astra Campus',
        capacity: Number(capacity)
      });
      if (res.data.success) {
        alert("Classroom created successfully!");
        setRoomName('');
        setCapacity('');
        fetchData();
      }
    } catch (err) {
      alert("Error creating classroom");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an Excel file first.");
    
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        // Expecting columns: roomName (or RoomName), capacity
        const formattedData = data.map(row => ({
          name: String(row.roomName || row.RoomName || row.Name || row['Room Name'] || row.Room || ''),
          venue: String(row.venue || row.Venue || 'Astra Campus'),
          capacity: Number(row.capacity || row.Capacity) || 0
        })).filter(room => room.name && room.capacity > 0);

        if (formattedData.length === 0) {
          return alert("Could not find valid 'name' or 'roomName' and 'capacity' columns in the Excel file.");
        }

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/classrooms/bulk`, { classrooms: formattedData });
        if (res.data.success) {
          alert(`${formattedData.length} classrooms created successfully!`);
          setFile(null);
          document.getElementById('excelUpload').value = '';
          fetchData();
        }
      } catch (err) {
        alert("Error processing Excel file. Please check the format.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const assignTeam = async (e) => {
    e.preventDefault();
    if (!selectedTeam || !selectedClassroom) return alert("Please select both a team and a classroom.");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/assign-team`, {
        teamId: selectedTeam,
        classroomId: selectedClassroom
      });
      if (res.data.success) {
        alert("Team assigned successfully!");
        setSelectedTeam('');
        setSelectedClassroom('');
        fetchData();
      }
    } catch (err) {
      alert("Error assigning team");
    }
  };

  const assignFaculty = async (e) => {
    e.preventDefault();
    if (!assignFacTeamId || !assignFacId) return alert("Please select both a team and a faculty.");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/admin/assign-faculty`, {
        teamId: assignFacTeamId,
        facultyId: assignFacId
      });
      if (res.data.success) {
        alert("Faculty assigned to team successfully!");
        setAssignFacTeamId('');
        setAssignFacId('');
        fetchData();
      }
    } catch (err) {
      alert("Error assigning faculty");
    }
  };

  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-ancient text-white mb-6">Dashboard Overview</h1>
      {loading ? <p className="text-[#d4af37]">Loading stats...</p> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="premium-card p-4 bg-transparent text-center border-l-4 border-blue-500">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Total Teams</p>
              <p className="text-4xl font-bold text-white mt-2">{stats?.totalTeams || 0}</p>
            </div>
            <div className="premium-card p-4 bg-transparent text-center border-l-4 border-green-500">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Total Revenue</p>
              <p className="text-4xl font-bold text-green-500 mt-2">₹{stats?.totalRevenue || 0}</p>
            </div>
            <div className="premium-card p-4 bg-transparent text-center border-l-4 border-purple-500">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Avin / Hack / Both</p>
              <p className="text-xl font-bold text-white mt-2 pt-2">
                <span className="text-purple-400">{stats?.avinyotsavTeams || 0}</span> / <span className="text-orange-400">{stats?.hackathonTeams || 0}</span> / <span className="text-pink-400">{stats?.bothTeams || 0}</span>
              </p>
            </div>
            <div className="premium-card p-4 bg-transparent text-center border-l-4 border-[#d4af37]">
              <p className="text-sm text-gray-400 uppercase tracking-wider">Verified Faculty</p>
              <p className="text-4xl font-bold text-[#d4af37] mt-2">{stats?.verifiedFaculty || 0}</p>
            </div>
          </div>

          <div className="premium-card p-6 bg-transparent mt-8 border border-[var(--color-card-border)]">
            <h2 className="text-xl font-bold mb-4 border-b border-[var(--color-card-border)] pb-2 text-[#d4af37]">Faculty Pending Verification</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="p-3 text-gray-300">Name</th>
                    <th className="p-3 text-gray-300">Faculty ID</th>
                    <th className="p-3 text-gray-300">Department</th>
                    <th className="p-3 text-gray-300">Status</th>
                    <th className="p-3 text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {faculty.filter(f => f.status === 'PENDING_VERIFICATION').length === 0 ? (
                    <tr><td colSpan="5" className="p-4 text-center text-gray-500">No pending verifications.</td></tr>
                  ) : (
                    faculty.filter(f => f.status === 'PENDING_VERIFICATION').map(f => (
                      <tr key={f._id} className="border-t border-[var(--color-card-border)] hover:bg-[#111]">
                        <td className="p-3 text-white">{f.name}</td>
                        <td className="p-3 text-blue-400 font-mono">{f.facultyId}</td>
                        <td className="p-3 text-gray-300">{f.department}</td>
                        <td className="p-3"><span className="bg-orange-900/50 text-orange-400 border border-orange-500/30 text-xs px-2 py-1 rounded font-bold">{f.status}</span></td>
                        <td className="p-3">
                          <button 
                            onClick={() => verifyFaculty(f._id)}
                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm transition-colors shadow-[0_0_10px_rgba(22,163,74,0.3)]"
                          >
                            Verify Presence
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderFacultyManagement = () => (
    <>
      <h1 className="text-3xl font-ancient text-white mb-6">Faculty Management</h1>
      <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="p-3 text-gray-300">Name</th>
                <th className="p-3 text-gray-300">Faculty ID</th>
                <th className="p-3 text-gray-300">Department</th>
                <th className="p-3 text-gray-300">Status</th>
                <th className="p-3 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500">No faculty registered yet.</td></tr>
              ) : (
                faculty.map(f => (
                  <tr key={f._id} className="border-t border-[var(--color-card-border)] hover:bg-[#111]">
                    <td className="p-3 text-white font-bold">{f.name}</td>
                    <td className="p-3 text-blue-400 font-mono">{f.facultyId}</td>
                    <td className="p-3 text-gray-300">{f.department}</td>
                    <td className="p-3">
                      <select 
                        value={f.status}
                        onChange={(e) => updateFacultyStatus(f._id, e.target.value)}
                        className={`bg-[#1a1a1a] text-xs font-bold p-1 rounded border outline-none ${f.status === 'VERIFIED' ? 'text-green-400 border-green-500' : f.status === 'PENDING_VERIFICATION' ? 'text-orange-400 border-orange-500' : 'text-red-400 border-red-500'}`}
                      >
                        <option value="PENDING_VERIFICATION">Pending</option>
                        <option value="VERIFIED">Verified</option>
                        <option value="ACTIVE">Active</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3 flex gap-2">
                      {f.status !== 'VERIFIED' && f.status !== 'ACTIVE' && (
                        <button onClick={() => updateFacultyStatus(f._id, 'VERIFIED')} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs">Approve</button>
                      )}
                      {f.status !== 'REJECTED' && (
                        <button onClick={() => updateFacultyStatus(f._id, 'REJECTED')} className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs">Reject</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderTeams = () => (
    <>
      <h1 className="text-3xl font-ancient text-white mb-6">Team Management</h1>

      <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)] mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#d4af37] border-b border-[var(--color-card-border)] pb-2">Assign Faculty to Team</h2>
        <form onSubmit={assignFaculty} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Select Team</label>
            <select 
              required
              value={assignFacTeamId}
              onChange={e => setAssignFacTeamId(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="">-- Choose Team --</option>
              {teams.map(t => (
                <option key={t._id} value={t._id}>{t.teamId} - {t.teamName}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Select Faculty</label>
            <select 
              required
              value={assignFacId}
              onChange={e => setAssignFacId(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="">-- Choose Faculty --</option>
              {faculty.filter(f => f.status === 'VERIFIED' || f.status === 'ACTIVE').map(f => (
                <option key={f._id} value={f._id}>{f.name} ({f.department})</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full md:w-auto bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-2 px-6 rounded transition-colors shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              Assign Faculty
            </button>
          </div>
        </form>
      </div>

      <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="p-3 text-gray-300">Team ID</th>
                <th className="p-3 text-gray-300">Team Name</th>
                <th className="p-3 text-gray-300">Type</th>
                <th className="p-3 text-gray-300">Payment</th>
                <th className="p-3 text-gray-300">Assigned Classroom</th>
                <th className="p-3 text-gray-300">Assigned Faculty</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="6" className="p-4 text-center text-gray-500">No teams registered yet.</td></tr>
              ) : (
                teams.map(team => (
                  <tr key={team._id} className="border-t border-[var(--color-card-border)] hover:bg-[#111]">
                    <td className="p-3 text-blue-400 font-mono font-bold">{team.teamId}</td>
                    <td className="p-3 text-white">{team.teamName}</td>
                    <td className="p-3 text-gray-300">{team.participationType}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-1 rounded font-bold ${team.paymentStatus === 'PAID' ? 'bg-green-900/50 text-green-400 border border-green-500/30' : 'bg-red-900/50 text-red-400 border border-red-500/30'}`}>
                        {team.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-gray-400">
                      {team.classroomId ? <span className="text-[#d4af37] font-bold">{team.classroomId.roomName}</span> : 'Not Assigned'}
                    </td>
                    <td className="p-3 text-gray-400 text-sm">
                      {team.assignedFaculty && team.assignedFaculty.length > 0 ? (
                        team.assignedFaculty.map(f => f.name).join(', ')
                      ) : (
                        'None'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderClassrooms = () => (
    <>
      <h1 className="text-3xl font-ancient text-white mb-6">Classroom & Event Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Create Classroom Options (Manual or Excel) */}
        <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-[#d4af37] border-b border-[var(--color-card-border)] pb-2">Create Classrooms</h2>
            
            {/* Bulk Upload Form */}
            <form onSubmit={handleFileUpload} className="mb-6 p-4 border border-dashed border-[#333] bg-[#0a0a0a] rounded-lg">
              <label className="block text-sm text-gray-300 font-bold mb-2">1. Bulk Upload (Excel)</label>
              <p className="text-xs text-gray-500 mb-3">Upload an .xlsx file with columns: `roomName`, `capacity`</p>
              <input 
                type="file" 
                id="excelUpload"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-400 mb-3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#1a1a1a] file:text-[#d4af37] hover:file:bg-[#222]"
              />
              <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded text-sm transition-colors shadow-[0_0_15px_rgba(22,163,74,0.3)]">
                Upload & Create Classrooms
              </button>
            </form>

            <div className="flex items-center text-gray-500 mb-6">
              <div className="flex-1 border-t border-[#333]"></div>
              <span className="px-3 text-xs uppercase tracking-widest font-bold">OR</span>
              <div className="flex-1 border-t border-[#333]"></div>
            </div>

            {/* Manual Form */}
            <form onSubmit={createClassroom} className="space-y-4">
              <label className="block text-sm text-gray-300 font-bold">2. Add Manually</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    required 
                    value={roomName}
                    onChange={e => setRoomName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    placeholder="Room Name (e.g. Lab 1)"
                  />
                </div>
                <div className="flex-1">
                  <input 
                    type="number" 
                    required 
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    placeholder="Capacity (e.g. 10)"
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-black font-bold py-2 rounded text-sm transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                Create Single Classroom
              </button>
            </form>
          </div>
        </div>

        {/* Assign Team */}
        <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)]">
          <h2 className="text-xl font-bold mb-4 text-blue-400 border-b border-[var(--color-card-border)] pb-2">Assign Team to Classroom</h2>
          <form onSubmit={assignTeam} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Select Team</label>
              <select 
                required
                value={selectedTeam}
                onChange={e => setSelectedTeam(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Choose Team --</option>
                {teams.filter(t => !t.classroomId).map(t => (
                  <option key={t._id} value={t._id}>{t.teamId} - {t.teamName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Select Classroom</label>
              <select 
                required
                value={selectedClassroom}
                onChange={e => setSelectedClassroom(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#333] rounded p-3 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Choose Classroom --</option>
                {classrooms.map(c => (
                  <option key={c._id} value={c._id}>{c.name} (Capacity: {c.assignedTeams?.length || 0} / {c.capacity})</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] mt-4">
              Assign Team
            </button>
          </form>
        </div>
      </div>

      <div className="premium-card p-6 bg-transparent border border-[var(--color-card-border)] mt-8">
        <h2 className="text-xl font-bold mb-4 text-white border-b border-[var(--color-card-border)] pb-2">Current Classrooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {classrooms.length === 0 ? <p className="text-gray-500">No classrooms created yet.</p> : classrooms.map(c => (
            <div key={c._id} className="bg-[#1a1a1a] p-4 rounded border border-[#333] shadow-lg">
              <h3 className="text-lg font-bold text-[#d4af37] mb-2">{c.name}</h3>
              <p className="text-xs text-gray-400 mb-3 font-mono">Capacity: {c.assignedTeams?.length || 0} / {c.capacity}</p>
              <div className="space-y-1">
                {c.assignedTeams && c.assignedTeams.map(t => (
                  <div key={t._id} className="text-xs text-white bg-black/50 p-2 rounded flex justify-between border border-[#222]">
                    <span className="font-mono text-blue-400">{t.teamId}</span>
                    <span className="truncate ml-2">{t.teamName}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-8 flex flex-col md:flex-row gap-6 mt-16">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-[#0a0a0a] border border-[var(--color-card-border)] text-[#f4e4bc] rounded-lg p-4 h-fit shadow-2xl">
        <h2 className="font-ancient text-xl text-[#d4af37] mb-6 border-b border-[var(--color-card-border)] pb-4 flex items-center justify-center uppercase tracking-widest">
          Admin Portal
        </h2>
        <ul className="space-y-2">
          <li 
            onClick={() => setActiveTab('dashboard')}
            className={`p-3 rounded cursor-pointer transition-colors font-bold uppercase text-xs tracking-wider ${activeTab === 'dashboard' ? 'bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            Dashboard Overview
          </li>
          <li 
            onClick={() => setActiveTab('faculty')}
            className={`p-3 rounded cursor-pointer transition-colors font-bold uppercase text-xs tracking-wider ${activeTab === 'faculty' ? 'bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            Faculty Management
          </li>
          <li 
            onClick={() => setActiveTab('teams')}
            className={`p-3 rounded cursor-pointer transition-colors font-bold uppercase text-xs tracking-wider ${activeTab === 'teams' ? 'bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            Team Management
          </li>
          <li 
            onClick={() => setActiveTab('classrooms')}
            className={`p-3 rounded cursor-pointer transition-colors font-bold uppercase text-xs tracking-wider ${activeTab === 'classrooms' ? 'bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'}`}
          >
            Classrooms & Events
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'faculty' && renderFacultyManagement()}
        {activeTab === 'teams' && renderTeams()}
        {activeTab === 'classrooms' && renderClassrooms()}
      </div>
    </div>
  );
};

export default AdminDashboard;

const bcrypt = require('bcryptjs');

// Pre-hashed passwords for instant startup
// admin123, Admin@123, faculty123, Faculty@123, team123, Team@123
const demoStore = {
  admins: [
    {
      _id: '661000000000000000000001',
      name: 'Super Admin',
      email: 'admin@astra.com',
      passwordPlain: 'admin123',
      role: 'ADMIN',
      status: 'ACTIVE'
    },
    {
      _id: '661000000000000000000002',
      name: 'Super Admin',
      email: 'admin@ac.edu',
      passwordPlain: 'admin123',
      role: 'ADMIN',
      status: 'ACTIVE'
    },
    {
      _id: '661000000000000000000003',
      name: 'Demo Admin',
      email: 'admin.demo@ancientcivilization.test',
      passwordPlain: 'Admin@123',
      role: 'ADMIN',
      status: 'VERIFIED'
    }
  ],
  faculty: [
    {
      _id: '662000000000000000000001',
      name: 'Demo Faculty',
      email: 'faculty.demo@ancientcivilization.test',
      passwordPlain: 'Faculty@123',
      role: 'FACULTY',
      facultyId: 'FAC-DEMO-001',
      department: 'Computer Science',
      designation: 'Professor',
      status: 'VERIFIED'
    },
    {
      _id: '662000000000000000000002',
      name: 'Dr. Vikramaditya Rao',
      email: 'faculty@astra.com',
      passwordPlain: 'faculty123',
      role: 'FACULTY',
      facultyId: 'FAC-001',
      department: 'Artificial Intelligence & Heritage Computing',
      designation: 'Head of Department',
      status: 'VERIFIED'
    }
  ],
  teams: [
    {
      _id: '663000000000000000000001',
      teamId: 'TEAM-DEMO-001',
      teamName: 'Demo Warriors',
      email: 'team.demo@ancientcivilization.test',
      passwordPlain: 'Team@123',
      participationType: 'BOTH',
      college: 'Demo Institute of Technology',
      department: 'Computer Science',
      year: '3rd Year',
      leader: {
        name: 'John Doe',
        rollNumber: 'CS123',
        email: 'leader@demo.test',
        phone: '1234567890',
        department: 'CS',
        year: '3'
      },
      members: [
        {
          name: 'Jane Smith',
          rollNumber: 'CS124',
          email: 'jane@demo.test',
          phone: '0987654321',
          department: 'CS',
          year: '3'
        }
      ],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      score: 94,
      stage: 4,
      elevation: '4,850m High Citadel Gates',
      assignedFaculty: ['662000000000000000000001']
    },
    {
      _id: '663000000000000000000002',
      teamId: 'TEAM-ASTRA-001',
      teamName: 'Solaris Architects',
      email: 'team@astra.com',
      passwordPlain: 'team123',
      participationType: 'BOTH',
      college: 'Astra Institute of Technology',
      department: 'AI & Data Science',
      year: '4th Year',
      leader: {
        name: 'Aarav Sharma',
        rollNumber: 'AI401',
        email: 'aarav@solaris.test',
        phone: '9876543210',
        department: 'AI',
        year: '4'
      },
      members: [
        {
          name: 'Diya Patel',
          rollNumber: 'AI402',
          email: 'diya@solaris.test',
          phone: '9876543211',
          department: 'AI',
          year: '4'
        }
      ],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      score: 98,
      stage: 5,
      elevation: '6,200m Golden Summit',
      assignedFaculty: ['662000000000000000000001', '662000000000000000000002']
    },
    {
      _id: '663000000000000000000003',
      teamId: 'TEAM-ASTRA-002',
      teamName: 'CyberVeda Pioneers',
      email: 'cyberveda@astra.test',
      passwordPlain: 'team123',
      participationType: 'HACKATHON',
      college: 'National Engineering College',
      department: 'Computer Science',
      year: '3rd Year',
      leader: { name: 'Kavya Nair', rollNumber: 'CS301', email: 'kavya@test.com' },
      members: [],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      score: 89,
      stage: 4,
      elevation: '4,850m High Citadel Gates',
      assignedFaculty: ['662000000000000000000001']
    },
    {
      _id: '663000000000000000000004',
      teamId: 'TEAM-ASTRA-003',
      teamName: 'Indus Quantum Matrix',
      email: 'indus@astra.test',
      passwordPlain: 'team123',
      participationType: 'BOTH',
      college: 'Indian Institute of Information Technology',
      department: 'Information Technology',
      year: '3rd Year',
      leader: { name: 'Rohan Verma', rollNumber: 'IT302', email: 'rohan@test.com' },
      members: [],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      score: 82,
      stage: 3,
      elevation: '3,600m Sun Citadel',
      assignedFaculty: ['662000000000000000000001']
    },
    {
      _id: '663000000000000000000005',
      teamId: 'TEAM-ASTRA-004',
      teamName: 'Garuda Flight Labs',
      email: 'garuda@astra.test',
      passwordPlain: 'team123',
      participationType: 'AVINYOTSAV',
      college: 'Technological University',
      department: 'Robotics',
      year: '2nd Year',
      leader: { name: 'Siddharth Sen', rollNumber: 'ROB201', email: 'sid@test.com' },
      members: [],
      paymentStatus: 'PAID',
      registrationStatus: 'CONFIRMED',
      qualificationStatus: 'QUALIFIED',
      score: 76,
      stage: 2,
      elevation: '2,200m Mist Chasm',
      assignedFaculty: ['662000000000000000000001']
    }
  ],
  classrooms: [
    { _id: '664000000000000000000001', roomNumber: 'LAB-301 (Golden Citadel Hall)', capacity: 30, allocatedTeamsCount: 5 },
    { _id: '664000000000000000000002', roomNumber: 'LAB-302 (Ancient Astronomy Arena)', capacity: 30, allocatedTeamsCount: 4 }
  ],
  event: {
    name: 'ANCIENT CIVILIZATION – AVINYOTSAV & HACKATHON',
    theme: 'Ancient Indian Civilization & Modern Innovation',
    participationOptions: ['AVINYOTSAV', 'HACKATHON', 'BOTH'],
    prices: {
      AVINYOTSAV: 150,
      HACKATHON: 500,
      BOTH: 650
    },
    status: 'ACTIVE'
  }
};

module.exports = demoStore;

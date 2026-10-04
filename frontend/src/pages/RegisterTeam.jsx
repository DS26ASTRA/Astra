import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RegisterTeam = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'BOTH';
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    participationType: initialType,
    teamName: '',
    college: '',
    department: '',
    year: '',
    email: '',
    password: '',
    leader: { name: '', rollNumber: '', email: '', phone: '', department: '', year: '' },
    members: []
  });

  const getAmount = () => {
    if (formData.participationType === 'AVINYOTSAV') return 150;
    if (formData.participationType === 'HACKATHON') return 500;
    if (formData.participationType === 'BOTH') return 650;
    return 0;
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: '', rollNumber: '', email: '', phone: '', department: '', year: '' }]
    });
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    newMembers[index][field] = value;
    setFormData({ ...formData, members: newMembers });
  };

  const initPayment = async (teamId, amount) => {
    try {
      const { data: { data: order } } = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/payments/create-order`, { teamId });

      const options = {
        key: 'rzp_test_xxxxxx',
        amount: order.amount,
        currency: order.currency,
        name: 'Ancient Civilization',
        description: 'Team Registration',
        order_id: order.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/payments/verify`, {
              ...response,
              teamId
            });
            if (verifyRes.data.success) {
              navigate('/team/login', { state: { message: 'PAYMENT SUCCESSFUL ✓. Please login with your Team Email and Password.' } });
            }
          } catch (err) {
            setError('Payment verification failed.');
          }
        },
        prefill: {
          name: formData.teamName,
          email: formData.email,
          contact: formData.leader.phone
        },
        theme: {
          color: '#d4af37'
        }
      };
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error initiating payment');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/teams/register`, formData);
      if (res.data.success) {
        // BYPASS RAZORPAY FOR TESTING
        navigate('/team/login', { state: { message: 'REGISTRATION SUCCESSFUL ✓. Please login with your Team Email and Password.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = ["PARTICIPATION", "TEAM DETAILS", "MEMBERS", "REVIEW", "PAYMENT"];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600354143497-22ce2d744b8f?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/40"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto pt-12 pb-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-ancient text-white tracking-[0.2em] uppercase mb-4 drop-shadow-lg">
            TEAM REGISTRATION
          </h2>
          <p className="text-[#d4af37] tracking-widest text-sm uppercase">Join the Ancient Civilization</p>
        </div>
        
        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[var(--color-card-border)] -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-[2px] bg-[#d4af37] -z-10 -translate-y-1/2 transition-all duration-500 shadow-[0_0_10px_#d4af37]" style={{ width: `${((step - 1) / 3.9) * 100}%` }}></div>
            
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-ancient font-bold transition-all duration-300 ${
                  step > num ? 'bg-[#d4af37] text-black shadow-[0_0_15px_#d4af37]' : 
                  step === num ? 'border-2 border-[#d4af37] bg-black text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.5)] scale-110' : 
                  'bg-black border border-[var(--color-card-border)] text-gray-500'
                }`}>
                  {step > num ? <Check size={16} /> : `0${num}`}
                </div>
                <span className={`text-[10px] uppercase tracking-widest mt-3 absolute -bottom-6 w-24 text-center -ml-8 ${step === num ? 'text-[#d4af37]' : 'text-gray-500'}`}>
                  {stepTitles[num-1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-xl p-6 md:p-10"
        >
          {error && <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-6 text-sm tracking-wide">{error}</div>}

          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            
            {/* STEP 1: PARTICIPATION */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-ancient text-white uppercase tracking-widest">Choose Your Participation</h3>
                  <p className="text-gray-400 text-sm mt-2">One event. Choose your path.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: 'AVINYOTSAV', price: 150, title: 'Avinyotsav', desc: 'Cultural & Creative Experience' },
                    { id: 'BOTH', price: 650, title: 'Both', desc: 'Complete Experience (Recommended)', isBest: true },
                    { id: 'HACKATHON', price: 500, title: 'Hackathon', desc: 'Technology & Innovation Challenge' }
                  ].map(plan => (
                    <div 
                      key={plan.id}
                      onClick={() => setFormData({...formData, participationType: plan.id})}
                      className={`relative premium-card p-6 cursor-pointer flex flex-col items-center text-center transition-all duration-300 ${
                        formData.participationType === plan.id 
                          ? 'border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] bg-[rgba(212,175,55,0.15)] transform scale-105' 
                          : 'border-[var(--color-card-border)]'
                      }`}
                    >
                      {formData.participationType === plan.id && (
                        <div className="absolute top-2 right-2 text-[#d4af37]">
                          <Check size={20} />
                        </div>
                      )}
                      
                      <h4 className="font-ancient text-white tracking-widest uppercase mb-4 text-xl">{plan.title}</h4>
                      <div className={`text-3xl font-bold mb-4 ${formData.participationType === plan.id ? 'text-[#d4af37]' : 'text-gold-gradient'}`}>
                        ₹{plan.price}
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{plan.desc}</p>
                      
                      {formData.participationType !== plan.id && (
                        <div className="mt-6 border border-gray-600 text-gray-400 px-4 py-1 text-xs uppercase tracking-widest rounded hover:text-white">
                          Select
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-4 bg-black/60 border border-[var(--color-card-border)] rounded flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-widest block mb-1">Selected</span>
                    <span className="text-[#d4af37] font-bold tracking-widest uppercase">{formData.participationType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-xs uppercase tracking-widest block mb-1">Total</span>
                    <span className="text-2xl font-bold text-white">₹{getAmount()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TEAM DETAILS */}
            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-ancient text-[#d4af37] uppercase tracking-widest border-b border-[var(--color-card-border)] pb-2 mb-6">Team Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Team Name</label>
                    <input required type="text" className="w-full" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">College Name</label>
                    <input required type="text" className="w-full" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Login Email</label>
                    <input required type="email" className="w-full" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Login Password</label>
                    <input required type="password" autoComplete="new-password" className="w-full" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  </div>
                </div>

                <h3 className="text-xl font-ancient text-[#d4af37] uppercase tracking-widest border-b border-[var(--color-card-border)] pb-2 mt-10 mb-6">Team Leader</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                    <input required type="text" className="w-full" value={formData.leader.name} onChange={e => setFormData({...formData, leader: {...formData.leader, name: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Roll Number</label>
                    <input required type="text" className="w-full" value={formData.leader.rollNumber} onChange={e => setFormData({...formData, leader: {...formData.leader, rollNumber: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                    <input required type="tel" className="w-full" value={formData.leader.phone} onChange={e => setFormData({...formData, leader: {...formData.leader, phone: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Department</label>
                    <input required type="text" className="w-full" value={formData.leader.department} onChange={e => setFormData({...formData, leader: {...formData.leader, department: e.target.value}})} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Year</label>
                    <input required type="text" className="w-full" value={formData.leader.year} onChange={e => setFormData({...formData, leader: {...formData.leader, year: e.target.value}})} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: MEMBERS */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[var(--color-card-border)] pb-2 mb-6">
                  <h3 className="text-xl font-ancient text-[#d4af37] uppercase tracking-widest">Additional Members</h3>
                  <button type="button" onClick={addMember} className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-4 py-1 text-xs uppercase tracking-widest transition-colors">+ Add Member</button>
                </div>
                
                {formData.members.length === 0 && (
                  <div className="text-center py-10 border border-dashed border-[var(--color-card-border)] rounded bg-black/30">
                    <p className="text-gray-400 text-sm tracking-wider">No additional members added.</p>
                    <p className="text-gray-500 text-xs mt-2">Click "+ Add Member" to invite your squad.</p>
                  </div>
                )}

                {formData.members.map((member, index) => (
                  <div key={index} className="border border-[var(--color-card-border)] p-6 rounded bg-black/40 relative">
                    <h4 className="font-ancient text-white tracking-widest uppercase mb-4">Member {index + 2}</h4>
                    <button type="button" onClick={() => setFormData({...formData, members: formData.members.filter((_, i) => i !== index)})} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xs uppercase tracking-widest">Remove</button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Name</label><input required className="w-full mt-1" value={member.name} onChange={e => handleMemberChange(index, 'name', e.target.value)} /></div>
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Roll No</label><input required className="w-full mt-1" value={member.rollNumber} onChange={e => handleMemberChange(index, 'rollNumber', e.target.value)} /></div>
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Email</label><input required type="email" className="w-full mt-1" value={member.email} onChange={e => handleMemberChange(index, 'email', e.target.value)} /></div>
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Phone</label><input required className="w-full mt-1" value={member.phone} onChange={e => handleMemberChange(index, 'phone', e.target.value)} /></div>
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Department</label><input required className="w-full mt-1" value={member.department} onChange={e => handleMemberChange(index, 'department', e.target.value)} /></div>
                      <div><label className="text-[10px] uppercase tracking-widest text-gray-500">Year</label><input required className="w-full mt-1" value={member.year} onChange={e => handleMemberChange(index, 'year', e.target.value)} /></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-ancient text-[#d4af37] uppercase tracking-widest border-b border-[var(--color-card-border)] pb-2 mb-6">Review Registration</h3>
                
                <div className="bg-black/60 border border-[var(--color-card-border)] p-8 rounded-lg space-y-6">
                  
                  <div className="grid grid-cols-2 gap-6 border-b border-[var(--color-card-border)] pb-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Event</p>
                      <p className="text-white font-ancient tracking-wider">Ancient Civilization</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Participation</p>
                      <p className="text-[#d4af37] font-bold tracking-widest">{formData.participationType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Team Name</p>
                      <p className="text-white">{formData.teamName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">College</p>
                      <p className="text-white">{formData.college}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Team Leader</p>
                    <p className="text-white">{formData.leader.name} <span className="text-gray-500 text-sm">({formData.leader.phone})</span></p>
                  </div>

                  {formData.members.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Members ({formData.members.length})</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {formData.members.map((m, i) => (
                          <li key={i}>• {m.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="border-t border-[var(--color-card-border)] pt-6 flex justify-between items-center">
                    <p className="text-sm uppercase tracking-widest text-gray-300">Total Amount</p>
                    <p className="text-3xl text-gold-gradient font-bold">₹{getAmount()}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-[var(--color-card-border)]">
              {step > 1 ? (
                <button type="button" onClick={handlePrev} className="btn-secondary text-xs px-6 py-2">Back</button>
              ) : <div></div>}
              
              {step < 4 ? (
                <button type="submit" className="btn-primary text-xs px-10 py-3">CONTINUE →</button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary text-xs px-8 py-3 bg-[#d4af37]/20 border-[#d4af37]">
                  {loading ? 'PROCESSING...' : `PROCEED TO PAYMENT (₹${getAmount()})`}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterTeam;

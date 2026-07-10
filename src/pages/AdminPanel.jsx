import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { PackageOpen, Calendar, MapPin, Mail, Phone, Box, LogOut, ArrowLeft, Check, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import './AdminPanel.css';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchEnquiries = async () => {
      if (!user) return; // Don't fetch if not logged in
      
      try {
        const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [user]);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'read' ? 'unread' : 'read';
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
        setEnquiries(prev => prev.filter(enq => enq.id !== id));
      } catch (error) {
        console.error("Error deleting enquiry:", error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (authChecking) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Admin Panel...</div>;
  }

  // If not logged in, show the Login screen
  if (!user) {
    return <Login />;
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Aanoor Global Exports - Admin Panel</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => navigate('/')} 
              className="admin-btn-outline" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
            >
              <ArrowLeft size={16} /> Back to Website
            </button>
            <button 
              onClick={handleSignOut} 
              className="admin-btn-danger"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </header>
      
      <main className="admin-container">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Recent Enquiries</h3>
            <span className="badge">{enquiries.length} Total</span>
          </div>
          
          {loading ? (
            <div className="admin-loading">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty">
              <PackageOpen size={48} />
              <p>No enquiries received yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Requirements</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => {
                    const isRead = enq.status === 'read';
                    return (
                    <tr key={enq.id} className={isRead ? 'row-read' : 'row-unread'}>
                      <td className="date-cell">
                        <Calendar size={14} />
                        {enq.createdAt ? new Date(enq.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                      </td>
                      <td>
                        <strong>{enq.name}</strong>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <Mail size={14} /> <a href={`mailto:${enq.email}`}>{enq.email}</a>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <Phone size={14} /> <a href={`tel:${enq.phone}`}>{enq.phone}</a>
                        </div>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <MapPin size={14} /> {enq.country || 'N/A'}
                        </div>
                      </td>
                      <td className="message-cell">
                        {enq.requirements}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleToggleRead(enq.id, enq.status)} 
                            className={`action-btn ${isRead ? 'btn-read' : 'btn-unread'}`}
                            title={isRead ? "Mark as unread" : "Mark as read"}
                          >
                            {isRead ? <CheckCircle2 size={18} /> : <Check size={18} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(enq.id)} 
                            className="action-btn btn-delete"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;

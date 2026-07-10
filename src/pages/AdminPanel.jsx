import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc, setDoc, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { PackageOpen, Calendar, MapPin, Mail, Phone, LogOut, ArrowLeft, Check, Trash2, CheckCircle2, Plus, Edit, X, UploadCloud, FileImage } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import './AdminPanel.css';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('enquiries');
  const navigate = useNavigate();

  // Enquiries
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);

  // Products
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Product Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    qualityAssurance: '',
    packagingDetails: '',
    globalShipping: '',
    variants: '',
    imageFile: null,
    imagePreview: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchEnquiries = async () => {
      if (!user) return;
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
        setLoadingEnquiries(false);
      }
    };
    if (activeTab === 'enquiries') {
      fetchEnquiries();
    }
  }, [user, activeTab]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [user, activeTab, isSaving]);

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

  // Product Modal Functions
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ title: '', description: '', qualityAssurance: '', packagingDetails: '', globalShipping: '', variants: '', imageFile: null, imagePreview: '' });
    setShowProductModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      qualityAssurance: product.qualityAssurance,
      packagingDetails: product.packagingDetails,
      globalShipping: product.globalShipping,
      variants: product.variants || '',
      imageFile: null,
      imagePreview: product.image
    });
    setShowProductModal(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show temporary local preview
      setFormData({
        ...formData,
        imagePreview: URL.createObjectURL(file)
      });
      
      setIsUploadingImage(true);
      try {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', 'aanoor');
        
        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/tbricgum/image/upload', {
          method: 'POST',
          body: uploadData,
        });
        
        const uploadedImg = await uploadRes.json();
        setFormData(prev => ({
          ...prev,
          imagePreview: uploadedImg.secure_url,
          imageFile: null
        }));
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        alert("Image upload failed. Please try again.");
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (isUploadingImage) {
      alert("Please wait for the image to finish uploading.");
      return;
    }
    
    if (!formData.imagePreview) {
      alert("Please select a product image before saving.");
      return;
    }
    
    setIsSaving(true);
    try {
      let imageUrl = formData.imagePreview; // This is now the Cloudinary URL

      const productData = {
        title: formData.title,
        description: formData.description,
        qualityAssurance: formData.qualityAssurance,
        packagingDetails: formData.packagingDetails,
        globalShipping: formData.globalShipping,
        variants: formData.variants,
        image: imageUrl,
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        productData.createdAt = new Date().toISOString();
        await addDoc(collection(db, 'products'), productData);
      }

      setShowProductModal(false);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // (Removed migration logic as it's no longer needed)

  if (authChecking) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Admin Panel...</div>;
  }

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
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            Recent Enquiries
          </button>
          <button 
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Manage Products
          </button>
        </div>

        {activeTab === 'enquiries' && (
          <div className="admin-card fade-in">
            <div className="admin-card-header">
              <h3>Recent Enquiries</h3>
              <span className="badge">{enquiries.length} Total</span>
            </div>
            
            {loadingEnquiries ? (
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
                        <td><strong>{enq.name}</strong></td>
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
                        <td className="message-cell">{enq.requirements}</td>
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
        )}

        {activeTab === 'products' && (
          <div className="admin-card fade-in">
            <div className="admin-card-header">
              <h3>Products Database</h3>
              <button className="admin-btn-primary" onClick={openAddModal}>
                <Plus size={16} /> Add Product
              </button>
            </div>
            
            {loadingProducts ? (
              <div className="admin-loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="admin-empty">
                <Box size={48} />
                <p>No products found. Start by adding one!</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="admin-product-card">
                     <div className="admin-product-image">
                        {product.image ? (
                          <img src={product.image} alt={product.title} />
                        ) : (
                          <div className="placeholder-img"><FileImage size={32} /></div>
                        )}
                     </div>
                     <div className="admin-product-content">
                       <h4>{product.title}</h4>
                       <p>{product.description.substring(0, 70)}...</p>
                       <div className="admin-product-actions">
                         <button onClick={() => openEditModal(product)} className="admin-btn-secondary">
                           <Edit size={14} /> Edit
                         </button>
                         <button onClick={() => deleteProduct(product.id)} className="admin-btn-danger-outline">
                           <Trash2 size={14} /> Delete
                         </button>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {showProductModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="admin-modal-close" onClick={() => setShowProductModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={saveProduct} className="admin-modal-body">
              <div className="form-group">
                <label>Product Title</label>
                <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="admin-input" />
              </div>
              
              <div className="form-group">
                <label>Short Description</label>
                <textarea required rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label>Quality Assurance Details (Optional)</label>
                <textarea rows="3" value={formData.qualityAssurance} onChange={e => setFormData({...formData, qualityAssurance: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label>Packaging Details (Optional)</label>
                <textarea rows="2" value={formData.packagingDetails} onChange={e => setFormData({...formData, packagingDetails: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label>Global Shipping (Optional)</label>
                <textarea rows="2" value={formData.globalShipping} onChange={e => setFormData({...formData, globalShipping: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label>Available Variants / Sizes (Optional)</label>
                <input type="text" placeholder="e.g. 5kg, 10kg, Grade A, Grade B" value={formData.variants} onChange={e => setFormData({...formData, variants: e.target.value})} className="admin-input" />
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-container">
                  {formData.imagePreview && (
                    <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()}
                    className="admin-btn-secondary"
                    disabled={isUploadingImage}
                  >
                    <UploadCloud size={16} /> 
                    {isUploadingImage ? 'Uploading to Cloudinary...' : (formData.imagePreview ? 'Change Image' : 'Select Image')}
                  </button>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" onClick={() => setShowProductModal(false)} className="admin-btn-secondary">Cancel</button>
                <button type="submit" disabled={isSaving || isUploadingImage} className="admin-btn-primary">
                  {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

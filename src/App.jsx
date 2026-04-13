import { useState, useEffect } from 'react';
import HospitalCard from './components/HospitalCard';
import { hospitals } from './data';
import { Search, HeartPulse, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import './index.css';
import './components.css';

function App() {
  const [currency, setCurrency] = useState('USD');
  const [toastMessage, setToastMessage] = useState('');

  const handleBook = (hospitalName, doctor, room, formattedPrice) => {
    setToastMessage(`Booking ${doctor} (${room}) at ${hospitalName} for ${formattedPrice}...`);
    // Clear toast after 4s
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            <HeartPulse color="var(--primary)" size={32} strokeWidth={2.5} />
            Rogveda
          </a>
          
          <div className="currency-selector">
            <button 
              className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
              onClick={() => setCurrency('USD')}
            >
              USD
            </button>
            <button 
              className={`currency-btn ${currency === 'INR' ? 'active' : ''}`}
              onClick={() => setCurrency('INR')}
            >
              INR
            </button>
            <button 
              className={`currency-btn ${currency === 'NGN' ? 'active' : ''}`}
              onClick={() => setCurrency('NGN')}
            >
              NGN
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Search Results</h1>
          <p className="page-subtitle">Showing {hospitals.length} hospitals for <strong>Total Knee Replacement</strong> in <strong>Delhi/NCR</strong></p>
        </div>

        {/* Mock Search Bar for Product Sense */}
        <div className="search-section">
          <div className="search-input-wrap">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by hospital, doctor, or procedure..." 
              defaultValue="Total Knee Replacement in Delhi"
            />
          </div>
          <button className="btn-filter">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        <div className="hospital-grid">
          {hospitals.map(hospital => (
            <HospitalCard 
              key={hospital.id} 
              hospital={hospital} 
              currency={currency} 
              onBook={handleBook}
            />
          ))}
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <CheckCircle2 color="var(--accent)" size={20} />
          <p>{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { Tag, Activity, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../data';

export default function HospitalCard({ hospital, currency, onBook }) {
  const [selectedDoctor, setSelectedDoctor] = useState(hospital.doctors[0]);
  const [selectedRoom, setSelectedRoom] = useState(hospital.roomTypes[0]);
  const [price, setPrice] = useState(0);

  // Find the lowest price across all combinations on mount
  useEffect(() => {
    let minPrice = Infinity;
    let minPriceDoctor = hospital.doctors[0];
    let minPriceRoom = hospital.roomTypes[0];

    hospital.doctors.forEach(doctor => {
      hospital.roomTypes.forEach(room => {
        const comboPrice = hospital.pricing[doctor]?.[room] || hospital.pricing[hospital.doctors[0]][room]; // Fallback to first doctor's room rate if undefined
        if (comboPrice && comboPrice < minPrice) {
          minPrice = comboPrice;
          minPriceDoctor = doctor;
          minPriceRoom = room;
        }
      });
    });

    setSelectedDoctor(minPriceDoctor);
    setSelectedRoom(minPriceRoom);
  }, [hospital]);

  // Update price when doctor/room changes
  useEffect(() => {
    const currentPrice = hospital.pricing[selectedDoctor]?.[selectedRoom];
    // If exact combo doesn't exist, use the first doctor's base rate for that room (based on implicit data patterns)
    const fallbackPrice = hospital.pricing[hospital.doctors[0]]?.[selectedRoom];
    setPrice(currentPrice || fallbackPrice || 0);
  }, [selectedDoctor, selectedRoom, hospital]);

  const [isLowestPrice] = useState(() => {
    let minPrice = Infinity;
    hospital.doctors.forEach(doctor => {
      hospital.roomTypes.forEach(room => {
        const comboPrice = hospital.pricing[doctor]?.[room] || hospital.pricing[hospital.doctors[0]][room];
        if (comboPrice && comboPrice < minPrice) minPrice = comboPrice;
      });
    });
    return minPrice; // Returning min price here to calculate dynamically below
  });

  const isCurrentLowest = () => price > 0 && price === isLowestPrice;

  const [pricePulse, setPricePulse] = useState(false);

  // Update price when doctor/room changes
  useEffect(() => {
    const currentPrice = hospital.pricing[selectedDoctor]?.[selectedRoom];
    // If exact combo doesn't exist, use the first doctor's base rate for that room (based on implicit data patterns)
    const fallbackPrice = hospital.pricing[hospital.doctors[0]]?.[selectedRoom];
    setPrice(currentPrice || fallbackPrice || 0);
    
    // Trigger pulse animation
    setPricePulse(true);
    const timer = setTimeout(() => setPricePulse(false), 500);
    return () => clearTimeout(timer);
  }, [selectedDoctor, selectedRoom, hospital]);

  return (
    <div className="card">
      <div className="card-image-wrap">
        <img src={hospital.image} alt={hospital.name} className="card-image" />
        <div className="image-overlay"></div>
        {isCurrentLowest() && (
          <div className="badge-lowest-price">
            <Tag size={12} fill="currentColor" /> Lowest Price
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="hospital-name">{hospital.name}</h3>
        <div className="procedure-name">
          <Activity size={14} />
          {hospital.procedure}
        </div>

        <div className="selectors">
          <div className="select-group">
            <label className="select-label">Doctor</label>
            <select 
              className="select-input"
              value={selectedDoctor} 
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              {hospital.doctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>

          <div className="select-group">
            <label className="select-label">Room Type</label>
            <select 
              className="select-input"
              value={selectedRoom} 
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {hospital.roomTypes.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="price-section">
          <span className="price-label">Total Cost</span>
          <div className="price-value-container">
            <span className={`price-value ${pricePulse ? 'price-pulse' : ''}`}>
              {formatCurrency(price, currency)}
            </span>
          </div>
        </div>

        <button 
          className="btn-book"
          onClick={() => onBook(hospital.name, selectedDoctor, selectedRoom, formatCurrency(price, currency))}
        >
          Book Now <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

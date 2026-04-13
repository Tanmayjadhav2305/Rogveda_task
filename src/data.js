export const hospitals = [
  {
    id: "h1",
    name: "Apollo Spectra, Delhi",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400&h=300",
    procedure: "Total Knee Replacement",
    doctors: ["Dr. Ramesh Kumar", "Dr. Priya Sharma"],
    roomTypes: ["General Ward", "Semi-Private", "Private"],
    pricing: {
      "Dr. Ramesh Kumar": { "General Ward": 3200, "Semi-Private": 3800, "Private": 4500 },
      "Dr. Priya Sharma": { "General Ward": 3000, "Semi-Private": 3800, "Private": 4500 }
    }
  },
  {
    id: "h2",
    name: "Max Saket, Delhi",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400&h=300",
    procedure: "Total Knee Replacement",
    doctors: ["Dr. Vikram Singh", "Dr. Anita Desai", "Dr. Mohit Verma"],
    roomTypes: ["General Ward", "Semi-Private", "Private", "Suite"],
    pricing: {
      "Dr. Vikram Singh": { "General Ward": 3600, "Semi-Private": 4200, "Private": 5000, "Suite": 6500 },
      "Dr. Anita Desai": { "General Ward": 3500, "Semi-Private": 4200, "Private": 5000, "Suite": 6500 },
      "Dr. Mohit Verma": { "General Ward": 3100, "Semi-Private": 4200, "Private": 5000, "Suite": 6500 }
    }
  },
  {
    id: "h3",
    name: "Fortis Gurgaon",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=400&h=300",
    procedure: "Total Knee Replacement",
    doctors: ["Dr. Sunil Mehta"],
    roomTypes: ["Semi-Private", "Private"],
    pricing: {
      "Dr. Sunil Mehta": { "Semi-Private": 3900, "Private": 4600 }
    }
  }
];

export const formatCurrency = (amount, currency) => {
  const rates = {
    USD: 1,
    INR: 83,
    NGN: 1550
  };
  
  const convertedAmount = amount * rates[currency];
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(convertedAmount);
};

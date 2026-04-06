// Mock LocalStorage Database for Tour & Travel App

export const MOCK_HOTELS = [
  // Nepal
  { id: 'h1', name: 'Hotel Annapurna View', country: 'Nepal', city: 'Pokhara', rating: 4.5, price: 120, image: 'https://images.unsplash.com/photo-1647679208171-85d25dcc22c2?auto=format&fit=crop&q=80&w=800' },
  { id: 'h2', name: 'Kathmandu Boutique Hotel', country: 'Nepal', city: 'Kathmandu', rating: 4.2, price: 80, image: 'https://images.unsplash.com/photo-1662379273654-242d1abe1a96?auto=format&fit=crop&q=80&w=800' },
  { id: 'h3', name: 'The Everest Lodge', country: 'Nepal', city: 'Namche Bazaar', rating: 4.8, price: 150, image: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574?auto=format&fit=crop&q=80&w=800' },
  
  // India
  { id: 'h4', name: 'Taj Mahal Palace', country: 'India', city: 'Mumbai', rating: 5.0, price: 300, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' },
  { id: 'h5', name: 'The Leela Palace', country: 'India', city: 'New Delhi', rating: 4.9, price: 250, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
  { id: 'h6', name: 'Umaid Bhawan Resort', country: 'India', city: 'Jodhpur', rating: 4.7, price: 200, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },

  // Switzerland
  { id: 'h7', name: 'Hotel Schweizerhof', country: 'Switzerland', city: 'Zurich', rating: 4.9, price: 400, image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=800' },
  { id: 'h8', name: 'The Alpine Chateau', country: 'Switzerland', city: 'Geneva', rating: 4.8, price: 350, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800' },
  { id: 'h9', name: 'Zermatt Peak Resort', country: 'Switzerland', city: 'Zermatt', rating: 5.0, price: 500, image: 'https://images.unsplash.com/photo-1735684510427-3865be889d83?auto=format&fit=crop&q=80&w=800' }
];

export const MOCK_PACKAGES = [
  // Nepal
  { id: 'p1', title: 'Trishuli River Rafting', country: 'Nepal', activity: 'Rafting', desc: 'Experience the thrill of white water rafting in the beautiful Trishuli river.', image: '/images/rafting.png' },
  { id: 'p2', title: 'Annapurna Circuit Cycle Trail', country: 'Nepal', activity: 'Cycling', desc: 'A challenging but rewarding cycle trail through the majestic Himalayas.', image: '/images/cycling.png' },
  { id: 'p3', title: 'Everest Base Camp Trek', country: 'Nepal', activity: 'Trekking', desc: 'The ultimate adventure to the base of the world\'s highest mountain.', image: '/images/trekking.png' },

  // India
  { id: 'p4', title: 'Rishikesh Bungee Jumping', country: 'India', activity: 'Bungee', desc: 'Take a leap of faith over the Ganges river in Rishikesh.', image: '/images/bungee.png' },
  { id: 'p5', title: 'Ladakh Motorbike Expedition', country: 'India', activity: 'Motorbiking', desc: 'Ride through the highest motorable roads in the world.', image: '/images/motorbiking.png' },
  { id: 'p6', title: 'Andaman Scuba Diving', country: 'India', activity: 'Scuba Diving', desc: 'Explore the vibrant coral reefs and marine life of the Andaman Islands.', image: '/images/scuba.png' },

  // Switzerland
  { id: 'p7', title: 'Swiss Alps Skiing', country: 'Switzerland', activity: 'Skiing', desc: 'Glide down the pristine slopes of the Swiss Alps.', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=800' },
  { id: 'p8', title: 'Interlaken Paragliding', country: 'Switzerland', activity: 'Paragliding', desc: 'Soar like a bird over the breathtaking landscapes of Interlaken.', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800' }
];

const STORAGE_KEYS = {
  USERS: 'travel_app_users', // Tourists and Guides
  REQUESTS: 'travel_app_requests', // Guide hiring requests
  BOOKINGS: 'travel_app_bookings' // Hotels and Packages
};

// Initialize DB safely
const initDB = () => {
  // Force update mock data for new images
  localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(MOCK_HOTELS));
  localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(MOCK_PACKAGES));

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
};

initDB();

export const StorageService = {
  // Auth Let's return the user without the password if found.
  registerUser: (userData) => {
    // userData format for tourist: { type: 'tourist', username, password }
    // userData format for guide: { type: 'guide', username, password, languages: [], country }
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const exists = users.find(u => u.username === userData.username);
    if (exists) throw new Error("Username already exists");
    
    userData.id = Date.now().toString();
    users.push(userData);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return userData;
  },

  loginUser: (username, password) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error("Invalid username or password");
    return user;
  },

  // Queries
  getGuidesByFilter: (country, language) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    return users.filter(u => 
      u.type === 'guide' && 
      (!country || u.country === country) && 
      (!language || u.languages.includes(language))
    );
  },

  getHotels: ({ country, city }) => {
    return MOCK_HOTELS.filter(h => 
      (!country || h.country === country) && 
      (!city || h.city === city)
    );
  },

  getPackages: ({ country }) => {
    return MOCK_PACKAGES.filter(p => !country || p.country === country);
  },

  // Requests (Guides)
  createRequest: (touristId, guideId, details) => {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS));
    
    // Constraint: 1 active Guide at a time
    const activeGuide = requests.find(r => r.touristId === touristId && (r.status === 'pending' || r.status === 'accepted'));
    if (activeGuide) {
      throw new Error(`You already have a guide request that is ${activeGuide.status}. Please cancel it to hire a different guide.`);
    }

    const req = {
      id: Date.now().toString(),
      touristId,
      guideId,
      status: 'pending', // pending, accepted, rejected
      details,
      createdAt: new Date().toISOString()
    };
    requests.push(req);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return req;
  },

  getRequestsForGuide: (guideId) => {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    
    return requests
      .filter(r => r.guideId === guideId)
      .map(r => {
        const tourist = users.find(u => u.id === r.touristId);
        return { ...r, touristName: tourist?.username || 'Unknown Tourist' };
      });
  },

  getRequestsForTourist: (touristId) => {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS));
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));

    return requests
      .filter(r => r.touristId === touristId)
      .map(r => {
        const guide = users.find(u => u.id === r.guideId);
        return { ...r, guideName: guide?.username || 'Unknown Guide' };
      });
  },

  updateRequestStatus: (requestId, newStatus) => {
    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS));
    const reqIndex = requests.findIndex(r => r.id === requestId);
    if (reqIndex !== -1) {
      requests[reqIndex].status = newStatus;
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
      return requests[reqIndex];
    }
    throw new Error('Request not found');
  },

  deleteRequest: (requestId) => {
    let requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS));
    requests = requests.filter(r => r.id !== requestId);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },

  // Bookings (Hotels and Packages)
  bookItem: (touristId, itemId, type) => {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
    
    // Constraint: 1 active booking per type
    const activeBooking = bookings.find(b => b.touristId === touristId && b.type === type);
    if (activeBooking) {
      throw new Error(`You already have an active ${type} booking. Please cancel it from My Bookings first.`);
    }

    const newBooking = {
      id: Date.now().toString(),
      touristId,
      itemId,
      type, // 'hotel' or 'package'
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  },

  getActiveBookings: (touristId) => {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
    return bookings.filter(b => b.touristId === touristId);
  },

  deleteBooking: (bookingId) => {
    let bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS));
    bookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }
};

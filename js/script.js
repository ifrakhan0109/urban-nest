// ===== PROPERTY DATA =====
const properties = [
  {
    id: 1,
    title: "Modern Glass Villa",
    type: "Villa",
    location: "DHA Phase 6, Karachi",
    price: 850000,
    beds: 4,
    baths: 5,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  },
  {
    id: 2,
    title: "Luxury Downtown Apartment",
    type: "Apartment",
    location: "Clifton Block 5, Karachi",
    price: 350000,
    beds: 3,
    baths: 3,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
  },
  {
    id: 3,
    title: "Classic Family House",
    type: "House",
    location: "Bahria Town, Karachi",
    price: 250000,
    beds: 4,
    baths: 4,
    sqft: 2400,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
  },
  {
    id: 4,
    title: "Penthouse with Sea View",
    type: "Apartment",
    location: "Sea View, Karachi",
    price: 950000,
    beds: 4,
    baths: 4,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80"
  },
  {
    id: 5,
    title: "Contemporary Smart Home",
    type: "House",
    location: "Gulshan-e-Iqbal, Karachi",
    price: 320000,
    beds: 3,
    baths: 3,
    sqft: 2000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    id: 6,
    title: "Elegant Townhouse",
    type: "House",
    location: "PECHS, Karachi",
    price: 280000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
  }
];

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  }
}

// ===== RENDER PROPERTIES (Cards) =====
function renderProperties(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = '<p style="text-align:center; width:100%; color:#666; grid-column: 1/-1;">No properties found matching your criteria.</p>';
    return;
  }

  container.innerHTML = data.map(p => `
    <div class="property-card">
      <div class="property-img">
        <img src="${p.image}" alt="${p.title}">
        <span class="property-price">$${p.price.toLocaleString()}</span>
      </div>
      <div class="property-info">
        <span class="property-type">${p.type}</span>
        <h3>${p.title}</h3>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${p.location}</p>
        <div class="property-features">
          <span><i class="fas fa-bed"></i> ${p.beds} Beds</span>
          <span><i class="fas fa-bath"></i> ${p.baths} Baths</span>
          <span><i class="fas fa-ruler-combined"></i> ${p.sqft} sqft</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== FILTERS & SEARCH (Listings Page) =====
function initFilters() {
  const searchInput = document.getElementById('searchInput');
  const filterType = document.getElementById('filterType');
  const sortPrice = document.getElementById('sortPrice');
  
  if (!searchInput) return; // Exit if not on listings page

  function applyFilters() {
    let filtered = [...properties];
    const query = searchInput.value.toLowerCase();
    const type = filterType.value;
    const sort = sortPrice.value;

    // 1. Search by text
    if (query) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query)
      );
    }

    // 2. Filter by type
    if (type !== 'all') {
      filtered = filtered.filter(p => p.type === type);
    }

    // 3. Sort by price
    if (sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    renderProperties('listingsGrid', filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  filterType.addEventListener('change', applyFilters);
  sortPrice.addEventListener('change', applyFilters);
  
  applyFilters(); // Initial render
}

// ===== HERO QUICK SEARCH =====
function searchProperties() {
  const type = document.getElementById('heroType').value;
  const beds = document.getElementById('heroBeds').value;
  
  // Save to session storage and redirect
  sessionStorage.setItem('searchType', type);
  sessionStorage.setItem('searchBeds', beds);
  window.location.href = 'listings.html';
}

// ===== CONTACT FORM VALIDATION =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Check
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      name.nextElementSibling.classList.add('show');
      isValid = false;
    } else {
      name.nextElementSibling.classList.remove('show');
    }

    // Email Check
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.nextElementSibling.classList.add('show');
      isValid = false;
    } else {
      email.nextElementSibling.classList.remove('show');
    }

    // Phone Check
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
      phone.nextElementSibling.classList.add('show');
      isValid = false;
    } else {
      phone.nextElementSibling.classList.remove('show');
    }

    // Property Check
    const property = document.getElementById('property');
    if (!property.value) {
      property.nextElementSibling.classList.add('show');
      isValid = false;
    } else {
      property.nextElementSibling.classList.remove('show');
    }

    // If everything is valid, show success message
    if (isValid) {
      form.reset();
      document.getElementById('formSuccess').classList.add('show');
      setTimeout(() => {
        document.getElementById('formSuccess').classList.remove('show');
      }, 5000);
    }
  });
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  
  // Home page: Render 3 featured properties
  if (document.getElementById('featuredGrid')) {
    renderProperties('featuredGrid', properties.slice(0, 3));
  }
  
  // Listings page: Initialize search and filters
  if (document.getElementById('listingsGrid')) {
    initFilters();
  }
});
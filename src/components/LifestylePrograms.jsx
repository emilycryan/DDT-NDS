import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the user's current location (distinct from program markers)
const userLocationIcon = L.divIcon({
  className: 'user-location-icon',
  html:
    '<div style="width:16px;height:16px;border-radius:999px;background:#2563eb;border:2px solid #ffffff;box-shadow:0 0 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Component to handle map view updates
function MapViewUpdater({ center, zoom, bounds }) {
  const map = useMap();
  
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      // Fit map to show all markers
      const latLngBounds = L.latLngBounds(bounds);
      map.fitBounds(latLngBounds, { padding: [50, 50], maxZoom: 15 });
    } else if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, bounds, map]);
  
  return null;
}

const LifestylePrograms = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchInput, setSearchInput] = useState('');
  const [programFormat, setProgramFormat] = useState(''); // '', 'in-person', 'virtual', 'hybrid'
  const [filters, setFilters] = useState({
    freeOrLowCost: false,
    insuranceCovered: false,
    wholeHealthFocus: false,
    caregiverFamilyFriendly: false,
    languageSpanish: false,
    accessibilitySignLanguage: false,
    faithBased: false,
    glp1Specific: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // Programs to show in search results list
  const [allPrograms, setAllPrograms] = useState([]); // All programs from database for map display
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Map-related state
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of USA
  const [mapZoom, setMapZoom] = useState(4); // Default US view
  const [userLocation, setUserLocation] = useState(null);
  const [locationRequested, setLocationRequested] = useState(false);
  const [mapBounds, setMapBounds] = useState(null); // For fitting all markers
  const [showUserLocation, setShowUserLocation] = useState(false); // Only show user location for location-based searches
  const mapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load all programs from database on component mount
  useEffect(() => {
    const loadAllPrograms = async () => {
      try {
        const response = await fetch('/api/programs/all');
        if (response.ok) {
          const data = await response.json();
          if (data.programs && data.programs.length > 0) {
            // Store all programs for map display
            setAllPrograms(data.programs);
            
            // Filter programs that have coordinates for map bounds
            const programsWithCoords = data.programs.filter(p => p.latitude && p.longitude);
            if (programsWithCoords.length > 0) {
              // Set map bounds to show all programs
              const bounds = programsWithCoords.map(p => [
                parseFloat(p.latitude),
                parseFloat(p.longitude)
              ]);
              setMapBounds(bounds);
            }
          }
        }
      } catch (error) {
        console.error('Error loading programs:', error);
        // Fail silently - map will still work, just won't show initial markers
      }
    };

    loadAllPrograms();
  }, []);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation && !locationRequested) {
      setLocationRequested(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          // Only change map center if we don't have programs with bounds set
          if (!mapBounds || mapBounds.length === 0) {
            setMapCenter([latitude, longitude]);
            setMapZoom(10); // Zoom in to user's location
          }
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
          // Keep default US map view or program bounds
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }, [locationRequested, mapBounds]);

  // Geocoding function to convert address to coordinates
  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            'User-Agent': 'CDC-Path2Prevention-App' // Required by Nominatim
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding failed');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return [parseFloat(lat), parseFloat(lon)];
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Function to detect if input is a delivery mode keyword
  const detectDeliveryMode = (input) => {
    if (!input || typeof input !== 'string') {
      return null;
    }
    
    const trimmed = input.trim().toLowerCase();
    
    // Exact matches first (highest priority)
    if (trimmed === 'virtual' || trimmed === 'remote' || trimmed === 'online' ||
        trimmed === 'virtual-live' || trimmed === 'virtual-self-paced') {
      console.log('✅ Exact match detected for virtual/remote/online:', trimmed);
      return 'virtual';
    }
    
    if (trimmed === 'in-person' || trimmed === 'in person') {
      console.log('✅ Exact match detected for in-person:', trimmed);
      return 'in-person';
    }
    
    if (trimmed === 'hybrid') {
      console.log('✅ Exact match detected for hybrid:', trimmed);
      return 'hybrid';
    }
    
    // Partial matches (but be careful not to match city names or addresses)
    // Only match if the input is a single word or clearly about program type
    const words = trimmed.split(/\s+/);
    
    // Check if input contains delivery mode keywords as standalone words
    const virtualKeywords = ['virtual', 'remote', 'online'];
    const inPersonKeywords = ['in-person', 'in person'];
    const hybridKeywords = ['hybrid'];
    
    // If input is short (1-2 words) and contains delivery mode keywords, treat as delivery mode search
    if (words.length <= 2) {
      if (virtualKeywords.some(keyword => trimmed.includes(keyword))) {
        console.log('✅ Partial match detected for virtual keywords:', trimmed);
        return 'virtual';
      }
      if (inPersonKeywords.some(keyword => trimmed.includes(keyword))) {
        console.log('✅ Partial match detected for in-person keywords:', trimmed);
        return 'in-person';
      }
      if (hybridKeywords.some(keyword => trimmed.includes(keyword))) {
        console.log('✅ Partial match detected for hybrid keywords:', trimmed);
        return 'hybrid';
      }
    }
    
    console.log('❌ No delivery mode detected for:', trimmed);
    return null;
  };

  // Function to parse location input (city, state, zip)
  const parseLocationInput = (input) => {
    const trimmed = input.trim();
    
    // Check if it's a zip code (5 digits)
    const zipMatch = trimmed.match(/^\d{5}$/);
    if (zipMatch) {
      return { zipCode: trimmed };
    }
    
    // Check for "City, State" format
    const cityStateMatch = trimmed.match(/^([^,]+),\s*([A-Za-z]{2})$/);
    if (cityStateMatch) {
      return { 
        city: cityStateMatch[1].trim(), 
        state: cityStateMatch[2].toUpperCase() 
      };
    }
    
    // Check for state only (2 letters)
    const stateMatch = trimmed.match(/^[A-Za-z]{2}$/);
    if (stateMatch) {
      return { state: trimmed.toUpperCase() };
    }
    
    // Default to city search
    return { city: trimmed };
  };

  // Function to search programs by location, format, name, and filters
  const searchPrograms = async () => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    const addFilterParams = (params) => {
      if (filters.freeOrLowCost) params.append('freeOrLowCost', 'true');
      if (filters.insuranceCovered) params.append('insuranceCovered', 'true');
      if (filters.wholeHealthFocus) params.append('wholeHealthFocus', 'true');
      if (filters.caregiverFamilyFriendly) params.append('caregiverFamilyFriendly', 'true');
      if (filters.languageSpanish) params.append('languages', 'Spanish');
      if (filters.accessibilitySignLanguage) params.append('accessibilityOptions', 'sign language,ASL');
      if (filters.faithBased) params.append('faithBased', 'true');
      if (filters.glp1Specific) params.append('glp1Specific', 'true');
    };
    const buildQueryParams = () => {
      const params = new URLSearchParams();
      const locationParams = parseLocationInput(searchInput);
      if (locationParams.zipCode) params.append('zipCode', locationParams.zipCode);
      if (locationParams.state) params.append('state', locationParams.state);
      if (locationParams.city) params.append('city', locationParams.city);
      if (programFormat) params.append('deliveryMode', programFormat);
      addFilterParams(params);
      return params;
    };

    try {
      setShowUserLocation(true);

      const testTrimmed = String(searchInput).trim().toLowerCase();
      const deliveryModeFromInput = detectDeliveryMode(searchInput) || 
        (testTrimmed === 'online' || testTrimmed === 'remote' || testTrimmed === 'virtual' ? 'virtual' : 
         testTrimmed === 'hybrid' ? 'hybrid' : 
         (testTrimmed === 'in-person' || testTrimmed === 'in person' ? 'in-person' : null));
      const finalDeliveryMode = programFormat || deliveryModeFromInput;

      const queryParams = buildQueryParams();
      if (finalDeliveryMode && !queryParams.has('deliveryMode')) {
        queryParams.set('deliveryMode', finalDeliveryMode);
      }

      if (!queryParams.has('zipCode') && !queryParams.has('state') && !queryParams.has('city') && searchInput.trim()) {
        const lp = parseLocationInput(searchInput);
        if (lp.zipCode) queryParams.set('zipCode', lp.zipCode);
        if (lp.state) queryParams.set('state', lp.state);
        if (lp.city) queryParams.set('city', lp.city);
      }

      const response = await fetch(`/api/programs/search?${queryParams}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Search failed');
      }

      const data = await response.json();
      const programs = data.programs || [];
      setSearchResults(programs);

      if (programs.length === 0) {
        if (searchInput.trim()) {
          setError(`No programs found in ${searchInput.trim()}.`);
        } else if (finalDeliveryMode) {
          const modeLabel = finalDeliveryMode === 'virtual' ? 'virtual/online' : finalDeliveryMode;
          setError(`No ${modeLabel} programs found.`);
        } else {
          setError('No programs found.');
        }
      } else {
        setError(null);
      }

      if (programs.length > 0) {
        const programsWithCoords = programs.filter(p => p.latitude && p.longitude);
        if (programsWithCoords.length > 0) {
          const bounds = programsWithCoords.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
          if (userLocation) bounds.push(userLocation);
          setMapBounds(bounds);
          if (userLocation && !searchInput.trim()) {
            setMapCenter(userLocation);
            setMapZoom(10);
          }
        } else if (userLocation) {
          setMapCenter(userLocation);
          setMapZoom(10);
          setMapBounds(null);
        } else {
          setMapBounds(null);
        }
      } else {
        let coordinates = null;
        if (searchInput.trim()) {
          try {
            coordinates = await geocodeAddress(searchInput);
            if (coordinates) {
              setMapCenter(coordinates);
              setMapZoom(10);
            }
          } catch (_) {}
        }
        setMapBounds(null);
      }
    } catch (error) {
      console.error('Error searching programs:', error);
      const isNetworkError = error.message === 'Failed to fetch' || error.name === 'TypeError';
      const rawMessage = error.message || '';
      const isTechnicalError = /deliveryMode|zipCode|parameter|required/i.test(rawMessage);
      const message = isNetworkError
        ? "We couldn't connect to the search service. Please check your connection and try again."
        : isTechnicalError
          ? "Something went wrong with your search. Try again or use different search options."
          : (rawMessage || "Something went wrong. Please try again.");
      setError(message);
      setSearchResults([]);
      setMapBounds(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPrograms();
    }
  };

  return (
    <main style={{ 
      backgroundColor: 'white',
      minHeight: '80vh'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      }}>
        {/* Breadcrumbs */}
        <nav
          style={{
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--ink-70)',
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" style={{ color: 'var(--ink-70)', textDecoration: 'none' }}>
            Home
          </Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Lifestyle Programs</span>
        </nav>

        {/* Hero Section */}
        <section style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#FFEDE9',
              color: '#DC5A42',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              padding: '0.4rem 1.125rem',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
            }}
          >
            Lifestyle Programs
          </span>

          <h1
            style={{
              fontSize: isMobile ? '2.25rem' : '3rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: '600',
              color: '#333333',
              lineHeight: 1.15,
              margin: '0 0 0.5rem 0',
            }}
          >
            Lifestyle Change Programs
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              color: '#555555',
              lineHeight: 1.5,
              margin: '0 0 0.75rem 0',
            }}
          >
            Find the perfect program for you
          </p>

          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#555555',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Connect with CDC-recognized lifestyle change programs in your area or online. Programs such as these can help reduce the risk of chronic diseases when integrated into a healthy lifestyle.
          </p>
        </section>

        {/* Program format cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          alignItems: 'stretch',
        }}>
          {[
            { accentColor: '#DB3636', iconBgColor: '#FDE8E5', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'In-Person Programs', description: 'Meet with a lifestyle coach and other participants in a classroom setting for interactive group sessions and community-based learning.' },
            { accentColor: '#49534E', iconBgColor: '#E8E8E8', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>, title: 'Live Virtual Programs', description: 'Join interactive group sessions from home using video conferencing platforms like Zoom, with a real-time coach and live peer support.' },
            { accentColor: '#1f9660', iconBgColor: '#e8f4ef', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'On-Demand Programs', description: 'Complete sessions at your own pace using a smartphone, tablet, or computer — with no set meeting times and flexible scheduling.' },
          ].map((card, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid #e5e5e5', borderTop: `3px solid ${card.accentColor}`, display: 'flex', flexDirection: 'column', minHeight: 180 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: card.iconBgColor, color: card.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', flexShrink: 0 }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: '#2e2e2e', margin: '0 0 0.75rem 0' }}>{card.title}</h3>
              <p style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-body)', fontWeight: 400, color: '#6B7280', lineHeight: 1.55, margin: 0 }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program Finder Section */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: isMobile ? '1.5rem 1rem' : '2rem 2rem',
        margin: '0'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Find Your Perfect Program
          </h2>

          {/* Search Form */}
          <div style={{
            backgroundColor: 'var(--bg-content)',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr auto',
              gap: '1rem',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., Atlanta, GA or 30309"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    opacity: isLoading ? 0.6 : 1
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Program format
                </label>
                <select
                  value={programFormat}
                  onChange={(e) => setProgramFormat(e.target.value)}
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    backgroundColor: 'white',
                    opacity: isLoading ? 0.6 : 1
                  }}
                >
                  <option value="">Any</option>
                  <option value="in-person">In-person</option>
                  <option value="virtual">Virtual / Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <button
                onClick={searchPrograms}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? 'var(--text-secondary)' : 'var(--green-primary)',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {isLoading ? 'Searching...' : 'Find Programs'}
              </button>
            </div>

            {/* Filters toggle and checkboxes */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#E05A4D',
                  fontSize: '0.9375rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {showFilters ? '▼' : '▶'} Filter by program features
              </button>
              {showFilters && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '0.75rem 2rem',
                  marginTop: '1rem'
                }}>
                  {[
                    { key: 'freeOrLowCost', label: 'Free or low-cost' },
                    { key: 'insuranceCovered', label: 'Covered by insurance' },
                    { key: 'wholeHealthFocus', label: 'Whole health focus (not just diabetes)' },
                    { key: 'caregiverFamilyFriendly', label: 'Caregivers / family welcome' },
                    { key: 'languageSpanish', label: 'Spanish or other languages' },
                    { key: 'accessibilitySignLanguage', label: 'Sign language / accessibility options' },
                    { key: 'faithBased', label: 'Faith-based' },
                    { key: 'glp1Specific', label: 'GLP-1 / weight-loss medication support' },
                  ].map(({ key, label }) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9375rem', color: '#374151' }}>
                      <input
                        type="checkbox"
                        checked={!!filters[key]}
                        onChange={(e) => setFilters(f => ({ ...f, [key]: e.target.checked }))}
                        disabled={isLoading}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {/* Error Message */}
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.375rem',
                padding: '1rem',
                marginTop: '1rem'
              }}>
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.95rem',
                  margin: 0
                }}>
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '0',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem',
            overflow: 'hidden',
            height: isMobile ? '400px' : '500px'
          }}>
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapViewUpdater center={mapCenter} zoom={mapZoom} bounds={mapBounds} />
              
              {/* User location marker - only show for location-based searches */}
              {userLocation && showUserLocation && (
                <Marker position={userLocation} icon={userLocationIcon}>
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              
              {/* Program markers - show all programs from database, or search results if searching */}
              {(hasSearched ? searchResults : allPrograms).map((program, index) => {
                if (program.latitude && program.longitude) {
                  return (
                    <Marker 
                      key={program.program_id || program.id || index}
                      position={[parseFloat(program.latitude), parseFloat(program.longitude)]}
                    >
                      <Popup>
                        <div style={{ minWidth: '200px' }}>
                          <h4 style={{ 
                            fontSize: '1rem', 
                            fontWeight: '600', 
                            marginBottom: '0.5rem',
                            marginTop: 0,
                            color: '#1e293b'
                          }}>
                            {program.organization_name}
                          </h4>
                          {program.address_line1 && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: '#64748b'
                            }}>
                              {program.address_line1}
                              {program.city && `, ${program.city}, ${program.state} ${program.zip_code}`}
                            </p>
                          )}
                          {program.delivery_mode && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: '#64748b'
                            }}>
                              Delivery: {program.delivery_mode}
                            </p>
                          )}
                          {program.enrollment_status && (
                            <p style={{ 
                              fontSize: '0.875rem', 
                              margin: '0.25rem 0',
                              color: program.enrollment_status === 'open' ? '#1f9660' : 
                                     program.enrollment_status === 'closed' ? '#dc2626' : '#92400e',
                              fontWeight: '500'
                            }}>
                              Status: {program.enrollment_status}
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MapContainer>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              marginBottom: '3rem'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1.5rem'
              }}>
                Search Results
                {searchResults.length > 0 && (
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 'normal',
                    color: '#64748b',
                    marginLeft: '0.5rem'
                  }}>
                    ({searchResults.length} program{searchResults.length !== 1 ? 's' : ''} found)
                  </span>
                )}
              </h3>

              {searchResults.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#64748b'
                }}>
                  <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                    No programs found in this area
                  </p>
                  <p style={{ fontSize: '0.95rem' }}>
                    Try a different location or filter to broaden your results
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {searchResults.map((program, index) => (
                    <div key={program.program_id || index} style={{
                      backgroundColor: 'var(--bg-content)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '1.5rem'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                        gap: '1rem',
                        alignItems: 'start'
                      }}>
                        <div>
                          <h4 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: '0.5rem'
                          }}>
                            {program.website_url ? (
                              <a
                                href={program.website_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  color: '#1e293b',
                                  textDecoration: 'underline',
                                  textUnderlineOffset: '2px'
                                }}
                              >
                                {program.organization_name}
                              </a>
                            ) : (
                              program.organization_name
                            )}
                          </h4>
                          
                          {program.description && (
                            <p style={{
                              fontSize: '0.95rem',
                              color: '#64748b',
                              lineHeight: '1.5',
                              marginBottom: '1rem'
                            }}>
                              {program.description}
                            </p>
                          )}

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: '0.75rem',
                            fontSize: '0.9rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ color: '#6b7280' }}>📍</span>
                              <span style={{ color: '#374151' }}>
                                {program.address_line1 ? (
                                  <>
                                    <span style={{ display: 'block' }}>
                                      {program.address_line1}{program.address_line2 ? `, ${program.address_line2}` : ''}
                                    </span>
                                    <span style={{ display: 'block' }}>
                                      {program.city}, {program.state} {program.zip_code}
                                    </span>
                                  </>
                                ) : (
                                  <span style={{ display: 'block' }}>
                                    {program.city}, {program.state} {program.zip_code}
                                  </span>
                                )}
                              </span>
                            </div>
                            
                            {program.delivery_mode && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>🏥</span>
                                <span style={{ color: '#374151' }}>
                                  {program.delivery_mode}
                                </span>
                              </div>
                            )}
                            
                            {(program.cost !== null && program.cost !== undefined) && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>💰</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                  <span style={{ color: '#374151' }}>
                                    {Number(program.cost) === 0 ? 'Free' : `$${program.cost}`}
                                  </span>
                                  {Number(program.cost) > 0 && Array.isArray(program.insurance_accepted) && program.insurance_accepted.length > 0 && (
                                    <span style={{
                                      fontSize: '0.75rem',
                                      fontWeight: '600',
                                      color: '#1e40af',
                                      backgroundColor: '#eff6ff',
                                      border: '1px solid #bfdbfe',
                                      padding: '0.15rem 0.5rem',
                                      borderRadius: '999px',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      Insurance accepted
                                    </span>
                                  )}
                                </span>
                              </div>
                            )}
                            
                            {program.duration_weeks && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>📅</span>
                                <span style={{ color: '#374151' }}>
                                  {program.duration_weeks} weeks
                                </span>
                              </div>
                            )}

                            {program.contact_phone && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>📞</span>
                                <a
                                  href={`tel:${String(program.contact_phone).replace(/[^\d+]/g, '')}`}
                                  style={{
                                    color: '#374151',
                                    textDecoration: 'underline',
                                    textUnderlineOffset: '2px'
                                  }}
                                >
                                  {program.contact_phone}
                                </a>
                              </div>
                            )}

                            {program.website_url && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>🔗</span>
                                <a
                                  href={program.website_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    color: '#005ea2',
                                    textDecoration: 'underline',
                                    fontWeight: '600',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'anywhere'
                                  }}
                                >
                                  {program.website_url}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem'
                        }}>
                          {program.enrollment_status && (
                            <div style={{
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              textAlign: 'center',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              backgroundColor: program.enrollment_status === 'open' ? '#e8f4ef' : 
                                             program.enrollment_status === 'closed' ? '#fee2e2' : '#fef3c7',
                              color: program.enrollment_status === 'open' ? '#1f9660' : 
                                     program.enrollment_status === 'closed' ? '#dc2626' : '#92400e'
                            }}>
                              {program.enrollment_status === 'open' ? '✅ Open' : 
                               program.enrollment_status === 'closed' ? '❌ Closed' : '⏳ Waitlist'}
                            </div>
                          )}
                          
                          {(program.contact_phone || program.contact_email) && (
                            <div style={{
                              fontSize: '0.875rem',
                              color: '#64748b'
                            }}>
                              {program.contact_phone && (
                                <div style={{ marginBottom: '0.25rem' }}>
                                  📞{' '}
                                  <a
                                    href={`tel:${String(program.contact_phone).replace(/[^\d+]/g, '')}`}
                                    style={{
                                      color: '#64748b',
                                      textDecoration: 'underline',
                                      textUnderlineOffset: '2px'
                                    }}
                                  >
                                    {program.contact_phone}
                                  </a>
                                </div>
                              )}
                              {program.contact_email && (
                                <div>
                                  📧{' '}
                                  <a
                                    href={`mailto:${program.contact_email}`}
                                    style={{
                                      color: '#64748b',
                                      textDecoration: 'underline',
                                      textUnderlineOffset: '2px'
                                    }}
                                  >
                                    {program.contact_email}
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default LifestylePrograms;

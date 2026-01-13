import React, { useState, useEffect, useRef } from 'react';
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
        const response = await fetch('http://localhost:3004/api/programs/all');
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

  // Function to search programs by location
  const searchPrograms = async () => {
    console.log('🚀 searchPrograms called with input:', searchInput);
    
    if (!searchInput.trim()) {
      setError('Please enter a location or program type to search');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // First check if it's a delivery mode search
      console.log('🔍 About to call detectDeliveryMode with:', searchInput);
      console.log('🔍 searchInput type:', typeof searchInput);
      console.log('🔍 searchInput value:', JSON.stringify(searchInput));
      
      // Test direct match for debugging
      const testTrimmed = String(searchInput).trim().toLowerCase();
      console.log('🔍 Test trimmed:', testTrimmed);
      console.log('🔍 Is "online"?', testTrimmed === 'online');
      console.log('🔍 Is "remote"?', testTrimmed === 'remote');
      console.log('🔍 Is "virtual"?', testTrimmed === 'virtual');
      
      const deliveryMode = detectDeliveryMode(searchInput);
      console.log('🔍 Search input:', searchInput);
      console.log('🔍 Detected delivery mode:', deliveryMode);
      console.log('🔍 Delivery mode type:', typeof deliveryMode);
      console.log('🔍 Delivery mode truthy?', !!deliveryMode);
      console.log('🔍 Will enter if block?', !!deliveryMode);
      
      // Force check - if input is exactly "online", "remote", or "virtual", use delivery mode
      const forcedDeliveryMode = testTrimmed === 'online' || testTrimmed === 'remote' || testTrimmed === 'virtual' 
        ? 'virtual' 
        : (testTrimmed === 'hybrid' ? 'hybrid' : (testTrimmed === 'in-person' || testTrimmed === 'in person' ? 'in-person' : null));
      
      console.log('🔍 Forced delivery mode:', forcedDeliveryMode);
      const finalDeliveryMode = deliveryMode || forcedDeliveryMode;
      console.log('🔍 Final delivery mode to use:', finalDeliveryMode);
      
      if (finalDeliveryMode) {
        console.log('✅ Using delivery mode search path');
        // Search by delivery mode (no location required)
        // Show user location and center map on it if available
        setShowUserLocation(true);
        
        const queryParams = new URLSearchParams();
        queryParams.append('deliveryMode', finalDeliveryMode);
        
        const url = `http://localhost:3004/api/programs/search?${queryParams}`;
        console.log('✅ Fetching URL:', url);
        console.log('✅ Query params:', queryParams.toString());
        console.log('✅ Delivery mode being sent:', deliveryMode);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.message || 'Failed to search programs');
        }

        const data = await response.json();
        const programs = data.programs || [];
        setSearchResults(programs);
        
        // Show appropriate message for 0 results
        if (programs.length === 0) {
          // Use more user-friendly labels
          const modeLabel = finalDeliveryMode === 'virtual' ? 'virtual/remote/online' : finalDeliveryMode;
          setError(`No ${modeLabel} programs found.`);
        } else {
          setError(null);
        }
        
        // Set map bounds to show all programs (if they have coordinates)
        // If user location is available, center on it and include it in bounds
        if (programs.length > 0) {
          const programsWithCoords = programs.filter(p => p.latitude && p.longitude);
          if (programsWithCoords.length > 0) {
            const bounds = programsWithCoords.map(p => [
              parseFloat(p.latitude),
              parseFloat(p.longitude)
            ]);
            // Include user location in bounds if available
            if (userLocation) {
              bounds.push(userLocation);
              // Center map on user location
              setMapCenter(userLocation);
              setMapZoom(10);
            }
            setMapBounds(bounds);
          } else {
            // No program coordinates, but center on user location if available
            if (userLocation) {
              setMapCenter(userLocation);
              setMapZoom(10);
              setMapBounds(null);
            } else {
              // No coordinates at all, show default US view
              setMapBounds(null);
            }
          }
        } else {
          // No results, but center on user location if available
          if (userLocation) {
            setMapCenter(userLocation);
            setMapZoom(10);
            setMapBounds(null);
          } else {
            setMapBounds(null);
          }
        }
        
        // Return early - don't continue to location-based search
        return;
      } else {
        // Location-based search - show user location if available
        setShowUserLocation(true);
        
        // Try to geocode the search input to center map on the location
        // This is optional - search will work even if geocoding fails
        let coordinates = null;
        try {
          coordinates = await geocodeAddress(searchInput);
          if (coordinates) {
            setMapCenter(coordinates);
            setMapZoom(10);
          }
        } catch (geocodeError) {
          console.log('Geocoding failed, continuing with search:', geocodeError);
          // Continue with search even if geocoding fails
        }

        const locationParams = parseLocationInput(searchInput);
        const queryParams = new URLSearchParams();
        
        if (locationParams.zipCode) queryParams.append('zipCode', locationParams.zipCode);
        if (locationParams.state) queryParams.append('state', locationParams.state);
        if (locationParams.city) queryParams.append('city', locationParams.city);

        const response = await fetch(`http://localhost:3004/api/programs/search?${queryParams}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to search programs');
        }

        const data = await response.json();
        const programs = data.programs || [];
        setSearchResults(programs);
        
        // Show appropriate message for 0 results
        if (programs.length === 0) {
          setError(`No programs found in ${searchInput}.`);
        } else {
          setError(null);
        }
        
        // If we have results with coordinates, adjust map bounds to show all programs
        if (programs.length > 0) {
          const programsWithCoords = programs.filter(p => p.latitude && p.longitude);
          if (programsWithCoords.length > 0) {
            // Create bounds from all program coordinates
            const bounds = programsWithCoords.map(p => [
              parseFloat(p.latitude),
              parseFloat(p.longitude)
            ]);
            // Include user location or search location if available
            if (coordinates) {
              bounds.push(coordinates);
            } else if (userLocation && showUserLocation) {
              bounds.push(userLocation);
            }
            setMapBounds(bounds);
          } else if (coordinates) {
            // No program coordinates, but we have search location - center on it
            setMapCenter(coordinates);
            setMapZoom(10);
            setMapBounds(null);
          }
        } else if (coordinates) {
          // No results but we have coordinates - center on search location
          setMapCenter(coordinates);
          setMapZoom(10);
          setMapBounds(null);
        } else {
          setMapBounds(null);
        }
      }
      
    } catch (error) {
      console.error('Error searching programs:', error);
      // Only show generic error if it's an actual error (not 0 results)
      // 0 results are handled above with specific messages
      setError(error.message || 'Unable to search programs. Please try again.');
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
      backgroundColor: '#f8fafc',
      minHeight: '80vh'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 'bold',
            color: '#1e293b',
            lineHeight: '1.1',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Lifestyle Change Programs
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#0f766e',
            fontWeight: '600',
            marginBottom: '1.5rem',
            margin: '0 0 1.5rem 0'
          }}>
            Find the perfect program for you
          </p>

          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Connect with CDC-recognized lifestyle change programs in your area. These evidence-based programs are proven to reduce the risk of type 2 diabetes by 58%.
          </p>
        </div>
      </section>

      {/* Program Finder Section */}
      <section style={{
        backgroundColor: 'white',
        padding: isMobile ? '3rem 1rem' : '4rem 2rem',
        margin: '2rem 0'
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
            Find a Program Near You
          </h2>

          {/* Search Form Placeholder */}
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
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
                  Enter location or program type
                </label>
                <input
                  type="text"
                  placeholder="e.g., Atlanta, GA or 30309 or 'virtual' or 'remote'"
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
              <button 
                onClick={searchPrograms}
                disabled={isLoading || !searchInput.trim()}
                style={{
                  backgroundColor: isLoading || !searchInput.trim() ? '#9ca3af' : '#1e40af',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading || !searchInput.trim() ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap'
                }}>
                {isLoading ? 'Searching...' : 'Find Programs'}
              </button>
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
                <Marker position={userLocation}>
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
                              color: program.enrollment_status === 'open' ? '#166534' : 
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
                    Try searching with a different city, state, or zip code
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {searchResults.map((program, index) => (
                    <div key={program.program_id || index} style={{
                      backgroundColor: '#f8fafc',
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
                            {program.organization_name}
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
                                {program.city}, {program.state} {program.zip_code}
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
                            
                            {program.cost && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#6b7280' }}>💰</span>
                                <span style={{ color: '#374151' }}>
                                  ${program.cost}
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
                              backgroundColor: program.enrollment_status === 'open' ? '#dcfce7' : 
                                             program.enrollment_status === 'closed' ? '#fee2e2' : '#fef3c7',
                              color: program.enrollment_status === 'open' ? '#166534' : 
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
                                  📞 {program.contact_phone}
                                </div>
                              )}
                              {program.contact_email && (
                                <div>
                                  📧 {program.contact_email}
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

          {/* Program Types */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* In-Person Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#1e40af',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m0 0-3-3m3 3 3-3m-3 3-3 3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                In-Person Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Meet with a lifestyle coach and other participants in a classroom setting for interactive group sessions.
              </p>
            </div>

            {/* Live Virtual Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Live Virtual Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Join interactive group sessions from home using video conferencing platforms like Zoom.
              </p>
            </div>

            {/* On-Demand Programs */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#0ea5e9',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                  <circle cx="12" cy="10" r="2"/>
                  <path d="M12 14l-3 3h6l-3-3z"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                On-Demand Programs
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                Complete sessions at your own pace using a smartphone, tablet, or computer with flexible scheduling.
              </p>
            </div>
          </div>

          {/* At a Glance Info */}
          <div style={{
            backgroundColor: '#eff6ff',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid #bfdbfe'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '1rem'
            }}>
              About the National Diabetes Prevention Program
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  Proven Results
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  CDC-recognized programs have been proven to reduce the risk of developing type 2 diabetes by 58% through lifestyle changes.
                </p>
              </div>
              <div>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  Expert Support
                </h4>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  Trained lifestyle coaches guide you through evidence-based curriculum focused on healthy eating and physical activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LifestylePrograms;

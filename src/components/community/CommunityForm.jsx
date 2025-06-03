import React, { useState } from 'react'

// Location data - can be easily updated here
const locationsData = {
  locations: [
    {
      id: 1,
      name: 'Wheeling Clinic',
      address: '16th Street, Wheeling, WV',
      phone: '(304) 234-3654',
      hours: 'Mon-Fri 8AM-5PM',
      type: 'distribution',
      status: 'available',
      available_stock: 8,
      expiring_soon: 2,
      mapLink:
        'https://www.google.com/maps/place/Wheeling+Clinic/@40.0639825,-80.7217169,17z/data=!3m2!4b1!5s0x8835da2a282f8811:0xc6a12e626ad84b58!4m6!3m5!1s0x8835da2a28514ad3:0xbba1498958861db4!8m2!3d40.0639784!4d-80.719142!16s%2Fg%2F1tf71lh0?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      id: 2,
      name: 'Ohio County Health Dept',
      address: '2000 Eoff St, Wheeling, WV',
      phone: '(304) 234-3677',
      hours: 'Mon-Fri 9AM-4PM',
      type: 'distribution',
      status: 'low',
      available_stock: 3,
      expiring_soon: 1,
      mapLink:
        'https://www.google.com/maps/search/ohio+county+health+department/@40.0670118,-80.7235813,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      id: 3,
      name: 'Elm Grove Pharmacy',
      address: '88 Bethlehem Blvd, Elm Grove, WV',
      phone: '(304) 242-3456',
      hours: 'Mon-Sat 9AM-7PM',
      type: 'distribution',
      status: 'out',
      available_stock: 0,
      expiring_soon: 0,
      mapLink:
        'https://www.google.com/maps/place/Elm+Grove+Pharmacy/@40.0434121,-80.6614629,17z/data=!3m1!4b1!4m6!3m5!1s0x8835db0bf2f7367f:0x2bcf272dab758297!8m2!3d40.043408!4d-80.658888!16s%2Fg%2F1thmlnfc?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: 'Not a free resource (average $50)',
    },
    {
      id: 4,
      name: 'Valley Grove Community Center',
      address: 'National Road, Valley Grove, WV',
      phone: '(304) 547-8900',
      hours: 'Tue/Thu 10AM-2PM',
      type: 'distribution',
      status: 'out',
      available_stock: 0,
      expiring_soon: 0,
      mapLink:
        'https://www.google.com/maps/place/VALLEY+GROVE+COMMUNITY+CENTER/@40.0871424,-80.5756664,17z/data=!3m1!4b1!4m6!3m5!1s0x8835c58a0f100001:0xca6d8c40df984a01!8m2!3d40.0871384!4d-80.5707955!16s%2Fg%2F11qmn3_4rx?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      id: 5,
      name: 'Wheeling Hospital',
      address: '1 Medical Park, Wheeling, WV',
      phone: '(304) 243-3000',
      hours: '2nd Saturday each month, 10AM',
      type: 'training',
      status: 'available',
      available_stock: 6,
      expiring_soon: 3,
      mapLink:
        'https://www.google.com/maps/place/WVU+Wheeling+Hospital/@40.0591683,-80.6873961,17z/data=!3m2!4b1!5s0x8835da53cf5c7629:0x6caeea254ef7e936!4m6!3m5!1s0x8835da53b296190b:0x81824be535f5feb2!8m2!3d40.0591642!4d-80.6848212!16s%2Fg%2F1tc_rn_7?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: 'Enter through Emergency Department',
    },
    {
      id: 6,
      name: 'Ohio County EMS',
      address: '1845 National Rd, Wheeling, WV',
      phone: '(304) 243-4050',
      hours: 'Monthly training - call to schedule',
      type: 'training',
      status: 'available',
      available_stock: 10,
      expiring_soon: 0,
      mapLink:
        'https://www.google.com/maps/place/Ohio+County+Homeland+Security+and+Emergency+Management+Agency/@40.0647531,-80.7230829,17z/data=!3m1!4b1!4m6!3m5!1s0x8835da29f1c351c5:0xbbabb18332d4d10!8m2!3d40.064749!4d-80.720508!16s%2Fg%2F1263yyp8j?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
  ],
  metadata: {
    county: 'Ohio County',
    state: 'West Virginia',
    stateAbbr: 'WV',
    lastUpdated: '2025-06-03',
    totalLocations: 6,
    distributionCenters: 4,
    trainingFacilities: 2,
    totalStock: 27,
    totalExpiringSoon: 6,
  },
}

const CommunityForm = () => {
  const [selectedLocationId, setSelectedLocationId] = useState('')
  const [availableStock, setAvailableStock] = useState('')
  const [expiringSoon, setExpiringSoon] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [locations, setLocations] = useState(locationsData.locations)
  const [metadata] = useState(locationsData.metadata)
  const [myLocationId, setMyLocationId] = useState(null)

  // Function to update location stock
  const updateLocationStock = (
    locationId,
    newAvailableStock,
    newExpiringSoon,
  ) => {
    const updatedLocations = locations.map(location => {
      if (location.id === parseInt(locationId)) {
        const updatedLocation = {
          ...location,
          available_stock: parseInt(newAvailableStock) || 0,
          expiring_soon: parseInt(newExpiringSoon) || 0,
        }

        // Update status based on stock
        if (updatedLocation.available_stock === 0) {
          updatedLocation.status = 'out'
        } else if (updatedLocation.available_stock <= 3) {
          updatedLocation.status = 'low'
        } else {
          updatedLocation.status = 'available'
        }

        return updatedLocation
      }
      return location
    })

    setLocations(updatedLocations)
  }

  const handleSubmit = async () => {
    if (selectedLocationId && availableStock !== '' && expiringSoon !== '') {
      setIsSubmitting(true)
      setSubmitError('')

      try {
        // Update the location stock
        updateLocationStock(selectedLocationId, availableStock, expiringSoon)

        // Set this as their location for highlighting
        setMyLocationId(parseInt(selectedLocationId))

        console.log(
          'Stock updated successfully for location:',
          selectedLocationId,
        )
        setShowResults(true)
      } catch (error) {
        console.error('Error updating stock:', error)
        setSubmitError(
          'There was an error updating your stock information. Please try again.',
        )
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (showResults) {
    return (
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid #FFD700',
            }}
          >
            <h2 style={{ color: '#002855', margin: 0, fontSize: '2rem' }}>
              Resources in {metadata.county}, {metadata.stateAbbr}
            </h2>
            <p
              style={{
                color: '#28a745',
                fontSize: '1.125rem',
                margin: '0.5rem 0 0 0',
                fontWeight: '600',
              }}
            >
              ✅ Your stock information has been updated successfully!
            </p>
          </div>

          {/* Map Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                color: '#002855',
                marginBottom: '25px',
                fontSize: '1.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              📍 Locations in {metadata.county}, {metadata.stateAbbr}
            </h2>

            {/* Map Area */}
            <div
              style={{
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '30px',
                position: 'relative',
                backgroundColor: '#f8f9fa',
                height: '280px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  margin: '0 0 15px 0',
                  color: '#002855',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                }}
              >
                {metadata.county}, {metadata.state}
              </h3>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  color: '#6c757d',
                  fontSize: '1.125rem',
                  lineHeight: '1.4',
                }}
              >
                {metadata.totalLocations} locations tracked:
                <br />
                {metadata.distributionCenters} Narcan Distribution Centers •{' '}
                {metadata.trainingFacilities} Training Facilities
              </p>

              {/* Map overlay with info */}
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: '#002855',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                📍 {metadata.totalLocations} Locations • {metadata.county},{' '}
                {metadata.stateAbbr}
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '30px',
              }}
            >
              <h3
                style={{
                  color: '#002855',
                  margin: '0 0 15px 0',
                  fontSize: '1.25rem',
                  fontWeight: '600',
                }}
              >
                Status Legend
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '15px',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#28a745',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    ✓
                  </div>
                  <span
                    style={{
                      color: '#002855',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                  >
                    Available
                  </span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#ffc107',
                      color: '#002855',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    !
                  </div>
                  <span
                    style={{
                      color: '#002855',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                  >
                    Running Low
                  </span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    ✗
                  </div>
                  <span
                    style={{
                      color: '#002855',
                      fontSize: '1rem',
                      fontWeight: '500',
                    }}
                  >
                    Out of Stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {locations.map(location => {
              const isMyLocation = location.id === myLocationId

              const getStatusColor = status => {
                switch (status) {
                  case 'available':
                    return '#28a745'
                  case 'low':
                    return '#ffc107'
                  case 'out':
                    return '#dc3545'
                  default:
                    return '#007bff'
                }
              }

              const getStatusText = (status, type) => {
                // Always prioritize stock status over training
                switch (status) {
                  case 'available':
                    return 'Narcan Available'
                  case 'low':
                    return 'Running Low'
                  case 'out':
                    return 'Out of Stock'
                  default:
                    return 'Available'
                }
              }

              const getStatusIcon = (status, type) => {
                // Always prioritize stock status over training
                switch (status) {
                  case 'available':
                    return '✓'
                  case 'low':
                    return '!'
                  case 'out':
                    return '✗'
                  default:
                    return '✓'
                }
              }

              return (
                <div
                  key={location.id}
                  style={{
                    padding: '2rem',
                    borderRadius: '8px',
                    border: isMyLocation
                      ? '3px solid #FFD700'
                      : `2px solid ${
                          location.type === 'training'
                            ? '#002855'
                            : getStatusColor(location.status)
                        }`,
                    backgroundColor: isMyLocation
                      ? 'rgba(255, 215, 0, 0.08)'
                      : location.type === 'training'
                      ? 'rgba(0, 40, 85, 0.03)'
                      : location.status === 'available'
                      ? 'rgba(40, 167, 69, 0.03)'
                      : location.status === 'low'
                      ? 'rgba(255, 193, 7, 0.03)'
                      : 'rgba(220, 53, 69, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow =
                      '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* My Location Badge */}
                  {isMyLocation && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        backgroundColor: '#FFD700',
                        color: '#002855',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      🏢 YOUR LOCATION
                    </div>
                  )}

                  {/* Header with status badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      marginBottom: '20px',
                      marginTop: isMyLocation ? '25px' : '0',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor:
                          location.type === 'training'
                            ? '#002855'
                            : getStatusColor(location.status),
                        color:
                          location.status === 'low' &&
                          location.type !== 'training'
                            ? '#002855'
                            : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}
                    >
                      {getStatusIcon(location.status, location.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          color: '#002855',
                          fontSize: '1.375rem',
                          fontWeight: '600',
                          margin: '0 0 10px 0',
                          lineHeight: '1.3',
                        }}
                      >
                        {location.name}
                      </h4>
                      <span
                        style={{
                          backgroundColor:
                            location.type === 'training'
                              ? '#002855'
                              : getStatusColor(location.status),
                          color:
                            location.status === 'low' &&
                            location.type !== 'training'
                              ? '#002855'
                              : 'white',
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                        }}
                      >
                        {getStatusText(location.status, location.type)}
                      </span>
                    </div>
                  </div>

                  {/* Stock Information for My Location */}
                  {isMyLocation && (
                    <div
                      style={{
                        backgroundColor: '#fff8e1',
                        border: '2px solid #FFD700',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '20px',
                      }}
                    >
                      <h5
                        style={{
                          color: '#002855',
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          margin: '0 0 10px 0',
                        }}
                      >
                        📦 Current Stock Levels
                      </h5>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '15px',
                        }}
                      >
                        <div>
                          <span
                            style={{
                              color: '#6c757d',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                            }}
                          >
                            Available Units:
                          </span>
                          <div
                            style={{
                              color: '#002855',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                            }}
                          >
                            {location.available_stock}
                          </div>
                        </div>
                        <div>
                          <span
                            style={{
                              color: '#6c757d',
                              fontSize: '0.9rem',
                              fontWeight: '500',
                            }}
                          >
                            Expiring Soon:
                          </span>
                          <div
                            style={{
                              color: '#dc3545',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                            }}
                          >
                            {location.expiring_soon}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Location details */}
                  <div style={{ marginLeft: '51px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '14px',
                      }}
                    >
                      <span style={{ fontSize: '1.125rem' }}>📍</span>
                      <a
                        href={location.mapLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{
                          color: '#002855',
                          fontSize: '1rem',
                          lineHeight: '1.4',
                          textDecoration: 'underline',
                          fontWeight: '500',
                        }}
                      >
                        {location.address}
                      </a>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '14px',
                      }}
                    >
                      <span style={{ fontSize: '1.125rem' }}>📞</span>
                      <a
                        href={`tel:${location.phone}`}
                        style={{
                          color: '#002855',
                          fontSize: '1rem',
                          fontWeight: '600',
                          textDecoration: 'none',
                        }}
                      >
                        {location.phone}
                      </a>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom: '14px',
                      }}
                    >
                      <span style={{ fontSize: '1.125rem' }}>🕒</span>
                      <span
                        style={{
                          color: '#6c757d',
                          fontSize: '1rem',
                          lineHeight: '1.4',
                        }}
                      >
                        {location.hours}
                      </span>
                    </div>

                    {/* Stock Information for all locations except my location */}
                    {!isMyLocation && (
                      <div
                        style={{
                          backgroundColor: '#f8f9fa',
                          border: '1px solid #dee2e6',
                          borderRadius: '6px',
                          padding: '12px',
                          marginBottom: location.note ? '14px' : '0',
                        }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                          }}
                        >
                          <div>
                            <span
                              style={{
                                color: '#6c757d',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                display: 'block',
                              }}
                            >
                              📦 Available:
                            </span>
                            <div
                              style={{
                                color: '#002855',
                                fontSize: '1.25rem',
                                fontWeight: '600',
                              }}
                            >
                              {location.available_stock}
                            </div>
                          </div>
                          <div>
                            <span
                              style={{
                                color: '#6c757d',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                display: 'block',
                              }}
                            >
                              ⚠️ Expiring:
                            </span>
                            <div
                              style={{
                                color:
                                  location.expiring_soon > 0
                                    ? '#dc3545'
                                    : '#6c757d',
                                fontSize: '1.25rem',
                                fontWeight: '600',
                              }}
                            >
                              {location.expiring_soon}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {location.note && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          backgroundColor: '#fff8e1',
                          border: '1px solid #ffcc02',
                          borderRadius: '6px',
                          padding: '12px',
                        }}
                      >
                        <span style={{ fontSize: '1.125rem' }}>ℹ️</span>
                        <span
                          style={{
                            color: '#b8860b',
                            fontSize: '0.95rem',
                            lineHeight: '1.4',
                            fontWeight: '600',
                          }}
                        >
                          {location.note}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Emergency Section */}
          <div
            style={{
              backgroundColor: 'rgba(220, 53, 69, 0.05)',
              border: '2px solid #dc3545',
              borderRadius: '8px',
              padding: '2rem',
            }}
          >
            <h3
              style={{
                color: '#dc3545',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.25rem',
              }}
            >
              🚨 Emergency Resources
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff5f5',
                  padding: '1.5rem',
                  borderRadius: '6px',
                  border: '1px solid #fecaca',
                }}
              >
                <h4
                  style={{
                    color: '#dc3545',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  Emergency Services
                </h4>
                <p
                  style={{
                    color: '#002855',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    margin: 0,
                  }}
                >
                  Call 911 for overdose emergencies
                </p>
              </div>
              <div
                style={{
                  backgroundColor: '#fff5f5',
                  padding: '1.5rem',
                  borderRadius: '6px',
                  border: '1px solid #fecaca',
                }}
              >
                <h4
                  style={{
                    color: '#dc3545',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  Crisis Hotline
                </h4>
                <p
                  style={{
                    color: '#002855',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    margin: 0,
                  }}
                >
                  1-800-273-8255 (24/7 Support)
                </p>
              </div>
            </div>
          </div>

          {/* Back to form button at bottom */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => {
                setShowResults(false)
                setSelectedLocationId('')
                setAvailableStock('')
                setExpiringSoon('')
                setMyLocationId(null)
              }}
              style={{
                backgroundColor: '#002855',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              ← Update Another Location
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            color: '#002855',
            fontSize: '2.75rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontWeight: '600',
          }}
        >
          Update Stock Information
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#002855',
              marginBottom: '1rem',
            }}
          >
            Select your location:
          </label>
          <select
            value={selectedLocationId}
            onChange={e => setSelectedLocationId(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem',
              border: '2px solid #dee2e6',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#002855',
            }}
          >
            <option value=''>Choose your facility...</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name} -{' '}
                {location.type === 'training'
                  ? 'Training Facility'
                  : 'Distribution Center'}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#002855',
              marginBottom: '1rem',
            }}
          >
            Available Narcan units:
          </label>
          <input
            type='number'
            min='0'
            value={availableStock}
            onChange={e => setAvailableStock(e.target.value)}
            placeholder='Enter number of available units'
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem',
              border: '2px solid #dee2e6',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#002855',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#002855',
              marginBottom: '1rem',
            }}
          >
            Units expiring soon:
          </label>
          <input
            type='number'
            min='0'
            value={expiringSoon}
            onChange={e => setExpiringSoon(e.target.value)}
            placeholder='Enter number of units expiring soon'
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.125rem',
              border: '2px solid #dee2e6',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#002855',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Error message */}
        {submitError && (
          <div
            style={{
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              color: '#721c24',
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              fontSize: '1rem',
            }}
          >
            {submitError}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={
            !selectedLocationId ||
            availableStock === '' ||
            expiringSoon === '' ||
            isSubmitting
          }
          style={{
            width: '100%',
            backgroundColor:
              selectedLocationId &&
              availableStock !== '' &&
              expiringSoon !== '' &&
              !isSubmitting
                ? '#002855'
                : '#6c757d',
            color: 'white',
            padding: '1.25rem 2rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '500',
            cursor:
              selectedLocationId &&
              availableStock !== '' &&
              expiringSoon !== '' &&
              !isSubmitting
                ? 'pointer'
                : 'not-allowed',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {isSubmitting ? 'Updating...' : 'Update Stock Information'}
        </button>
      </div>
    </div>
  )
}

export default CommunityForm;

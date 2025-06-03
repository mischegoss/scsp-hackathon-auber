import React, { useState } from 'react'

const NeighborForm = () => {
  const [needsNarcan, setNeedsNarcan] = useState(false)
  const [needsTraining, setNeedsTraining] = useState(false)
  const [urgency, setUrgency] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [showResults, setShowResults] = useState(false)

  const handleSubmit = () => {
    if ((needsNarcan || needsTraining) && urgency && zipCode) {
      const data = {
        needs: [
          ...(needsNarcan ? ['narcan-access'] : []),
          ...(needsTraining ? ['narcan-training'] : []),
        ],
        urgency:
          urgency === 'planning-ahead' ? 1 : urgency === 'needed-soon' ? 3 : 5,
        zipCode,
        timestamp: new Date().toISOString(),
      }
      console.log('Form submitted:', data)
      setShowResults(true)
    }
  }

  const zipOptions = [
    { value: '', label: 'Select your zip code' },
    { value: '26003', label: '26003 - Wheeling' },
    { value: '26059', label: '26059 - Elm Grove' },
    { value: '26060', label: '26060 - Valley Grove' },
    { value: '26074', label: '26074 - Warwood' },
    { value: 'prefer-not', label: 'Prefer not to answer' },
  ]

  const locations = [
    {
      name: 'Wheeling Clinic',
      address: '16th Street, Wheeling, WV',
      phone: '(304) 234-3654',
      hours: 'Mon-Fri 8AM-5PM',
      type: 'distribution',
      status: 'available',
      id: 1,
      mapLink:
        'https://www.google.com/maps/place/Wheeling+Clinic/@40.0639825,-80.7217169,17z/data=!3m2!4b1!5s0x8835da2a282f8811:0xc6a12e626ad84b58!4m6!3m5!1s0x8835da2a28514ad3:0xbba1498958861db4!8m2!3d40.0639784!4d-80.719142!16s%2Fg%2F1tf71lh0?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      name: 'Ohio County Health Dept',
      address: '2000 Eoff St, Wheeling, WV',
      phone: '(304) 234-3677',
      hours: 'Mon-Fri 9AM-4PM',
      type: 'distribution',
      status: 'low',
      id: 2,
      mapLink:
        'https://www.google.com/maps/search/ohio+county+health+department/@40.0670118,-80.7235813,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      name: 'Elm Grove Pharmacy',
      address: '88 Bethlehem Blvd, Elm Grove, WV',
      phone: '(304) 242-3456',
      hours: 'Mon-Sat 9AM-7PM',
      type: 'distribution',
      status: 'out',
      id: 3,
      mapLink:
        'https://www.google.com/maps/place/Elm+Grove+Pharmacy/@40.0434121,-80.6614629,17z/data=!3m1!4b1!4m6!3m5!1s0x8835db0bf2f7367f:0x2bcf272dab758297!8m2!3d40.043408!4d-80.658888!16s%2Fg%2F1thmlnfc?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: 'Not a free resource (average $50)',
    },
    {
      name: 'Valley Grove Community Center',
      address: 'National Road, Valley Grove, WV',
      phone: '(304) 547-8900',
      hours: 'Tue/Thu 10AM-2PM',
      type: 'distribution',
      status: 'out',
      id: 4,
      mapLink:
        'https://www.google.com/maps/place/VALLEY+GROVE+COMMUNITY+CENTER/@40.0871424,-80.5756664,17z/data=!3m1!4b1!4m6!3m5!1s0x8835c58a0f100001:0xca6d8c40df984a01!8m2!3d40.0871384!4d-80.5707955!16s%2Fg%2F11qmn3_4rx?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
    {
      name: 'Wheeling Hospital',
      address: '1 Medical Park, Wheeling, WV',
      phone: '(304) 243-3000',
      hours: '2nd Saturday each month, 10AM',
      type: 'training',
      status: 'available',
      id: 5,
      mapLink:
        'https://www.google.com/maps/place/WVU+Wheeling+Hospital/@40.0591683,-80.6873961,17z/data=!3m2!4b1!5s0x8835da53cf5c7629:0x6caeea254ef7e936!4m6!3m5!1s0x8835da53b296190b:0x81824be535f5feb2!8m2!3d40.0591642!4d-80.6848212!16s%2Fg%2F1tc_rn_7?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: 'Enter through Emergency Department',
    },
    {
      name: 'Ohio County EMS',
      address: '1845 National Rd, Wheeling, WV',
      phone: '(304) 243-4050',
      hours: 'Monthly training - call to schedule',
      type: 'training',
      status: 'available',
      id: 6,
      mapLink:
        'https://www.google.com/maps/place/Ohio+County+Homeland+Security+and+Emergency+Management+Agency/@40.0647531,-80.7230829,17z/data=!3m1!4b1!4m6!3m5!1s0x8835da29f1c351c5:0xbbabb18332d4d10!8m2!3d40.064749!4d-80.720508!16s%2Fg%2F1263yyp8j?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
      note: null,
    },
  ]

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
              Resources in Ohio County, WV
            </h2>
            <button
              onClick={() => setShowResults(false)}
              style={{
                backgroundColor: '#FFD700',
                color: '#002855',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              ← Back to form
            </button>
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
              📍 Locations in Ohio County, WV
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
                Ohio County, West Virginia
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
                6 locations tracked:
                <br />4 Narcan Distribution Centers • 2 Training Facilities
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
                📍 {locations.length} Locations • Ohio County, WV
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
            {locations.map((location, index) => {
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
                if (type === 'training') return 'Training Available'
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
                if (type === 'training') return '🎓'
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
                  key={index}
                  style={{
                    padding: '2rem',
                    borderRadius: '8px',
                    border: `2px solid ${
                      location.type === 'training'
                        ? '#002855'
                        : getStatusColor(location.status)
                    }`,
                    backgroundColor:
                      location.type === 'training'
                        ? 'rgba(0, 40, 85, 0.03)'
                        : location.status === 'available'
                        ? 'rgba(40, 167, 69, 0.03)'
                        : location.status === 'low'
                        ? 'rgba(255, 193, 7, 0.03)'
                        : 'rgba(220, 53, 69, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
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
                  {/* Header with status badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '15px',
                      marginBottom: '20px',
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
                        marginBottom: location.note ? '14px' : '0',
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
          I need help with...
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
                fontWeight: '500',
              }}
            >
              <input
                type='checkbox'
                checked={needsNarcan}
                onChange={e => setNeedsNarcan(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  accentColor: '#002855',
                }}
              />
              Accessing free/low-cost Narcan in my community
            </label>
          </div>
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
                fontWeight: '500',
              }}
            >
              <input
                type='checkbox'
                checked={needsTraining}
                onChange={e => setNeedsTraining(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  accentColor: '#002855',
                }}
              />
              Getting Narcan training
            </label>
          </div>
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
            My request is...
          </label>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
                fontWeight: '500',
              }}
            >
              <input
                type='radio'
                name='urgency'
                value='planning-ahead'
                checked={urgency === 'planning-ahead'}
                onChange={e => setUrgency(e.target.value)}
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#002855',
                }}
              />
              Planning ahead
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
              }}
            >
              <input
                type='radio'
                name='urgency'
                value='needed-soon'
                checked={urgency === 'needed-soon'}
                onChange={e => setUrgency(e.target.value)}
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#002855',
                }}
              />
              Needed soon
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
              }}
            >
              <input
                type='radio'
                name='urgency'
                value='urgent'
                checked={urgency === 'urgent'}
                onChange={e => setUrgency(e.target.value)}
                style={{
                  width: '1rem',
                  height: '1rem',
                  accentColor: '#002855',
                }}
              />
              Urgent
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '1.125rem',
              fontWeight: '500',
              color: '#002855',
              marginBottom: '0.75rem',
            }}
          >
            Your area:
          </label>
          <select
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
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
            {zipOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!(needsNarcan || needsTraining) || !urgency || !zipCode}
          style={{
            width: '100%',
            backgroundColor:
              (needsNarcan || needsTraining) && urgency && zipCode
                ? '#002855'
                : '#6c757d',
            color: 'white',
            padding: '1.25rem 2rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '500',
            cursor:
              (needsNarcan || needsTraining) && urgency && zipCode
                ? 'pointer'
                : 'not-allowed',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Find Available Resources
        </button>
      </div>
    </div>
  )
}

export default NeighborForm

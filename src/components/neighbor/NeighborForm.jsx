import React, { useState } from 'react'

const SimpleNeighborForm = () => {
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
            maxWidth: '800px',
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

          <div
            style={{
              marginBottom: '2rem',
              backgroundColor: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: '#002855',
                fontSize: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              Interactive Map
            </h3>
            <p style={{ color: '#6c757d' }}>
              Map showing Narcan distribution centers and training facilities
              would appear here
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #FFD700',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
              }}
            >
              <h4 style={{ color: '#002855', margin: '0 0 0.5rem 0' }}>
                Wheeling Health District
              </h4>
              <p
                style={{
                  color: '#6c757d',
                  fontSize: '0.9rem',
                  margin: '0 0 0.5rem 0',
                }}
              >
                1500 Chapline St, Wheeling, WV
              </p>
              <p style={{ color: '#002855', fontSize: '0.9rem', margin: 0 }}>
                (304) 234-3654 • Mon-Fri 8AM-5PM
              </p>
            </div>
            <div
              style={{
                padding: '1.5rem',
                border: '2px solid #002855',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 40, 85, 0.05)',
              }}
            >
              <h4 style={{ color: '#002855', margin: '0 0 0.5rem 0' }}>
                Wheeling Hospital Training
              </h4>
              <p
                style={{
                  color: '#6c757d',
                  fontSize: '0.9rem',
                  margin: '0 0 0.5rem 0',
                }}
              >
                1 Medical Park, Wheeling, WV
              </p>
              <p style={{ color: '#002855', fontSize: '0.9rem', margin: 0 }}>
                (304) 243-3000 • 2nd Saturday each month
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(220, 53, 69, 0.05)',
              border: '2px solid #dc3545',
              borderRadius: '8px',
              padding: '1.5rem',
            }}
          >
            <h3
              style={{
                color: '#dc3545',
                fontSize: '1.25rem',
                marginBottom: '1rem',
              }}
            >
              🚨 Emergency Resources
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              <div>
                <h4
                  style={{
                    color: '#dc3545',
                    fontSize: '1rem',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  Emergency Services
                </h4>
                <p style={{ color: '#002855', fontWeight: '600', margin: 0 }}>
                  Call 911 for overdose emergencies
                </p>
              </div>
              <div>
                <h4
                  style={{
                    color: '#dc3545',
                    fontSize: '1rem',
                    margin: '0 0 0.5rem 0',
                  }}
                >
                  Crisis Hotline
                </h4>
                <p style={{ color: '#002855', fontWeight: '600', margin: 0 }}>
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
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '2rem',
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
                gap: '0.75rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
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
                gap: '0.75rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
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
              fontSize: '1.25rem',
              fontWeight: '600',
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
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.125rem',
                color: '#002855',
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
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#002855',
              marginBottom: '0.5rem',
            }}
          >
            Your area:
          </label>
          <select
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem',
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
            padding: '1rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.25rem',
            fontWeight: '600',
            cursor:
              (needsNarcan || needsTraining) && urgency && zipCode
                ? 'pointer'
                : 'not-allowed',
          }}
        >
          Find Available Resources
        </button>
      </div>
    </div>
  )
}

export default SimpleNeighborForm;

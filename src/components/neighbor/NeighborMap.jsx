import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'

const NeighborMap = ({ selectedNeeds }) => {
  console.log('NeighborMap rendering - React Simple Maps version')

  // West Virginia TopoJSON
  const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

  // Location data for Ohio County, WV
  const locations = [
    {
      name: 'Wheeling Health District',
      address: '1500 Chapline St, Wheeling, WV',
      phone: '(304) 234-3654',
      hours: 'Mon-Fri 8AM-5PM',
      type: 'distribution',
      coordinates: [-80.7209, 40.0668],
    },
    {
      name: 'Ohio County Health Dept',
      address: '2000 Eoff St, Wheeling, WV',
      phone: '(304) 234-3677',
      hours: 'Mon-Fri 9AM-4PM',
      type: 'distribution',
      coordinates: [-80.7283, 40.066],
    },
    {
      name: 'Elm Grove Pharmacy',
      address: '88 Bethlehem Blvd, Elm Grove, WV',
      phone: '(304) 242-3456',
      hours: 'Mon-Sat 9AM-7PM',
      type: 'distribution',
      coordinates: [-80.6773, 40.0464],
    },
    {
      name: 'Wheeling Hospital',
      address: '1 Medical Park, Wheeling, WV',
      phone: '(304) 243-3000',
      hours: '2nd Saturday each month, 10AM',
      type: 'training',
      coordinates: [-80.7032, 40.0791],
    },
  ]

  return (
    <div style={{ padding: '20px' }}>
      <h2
        style={{
          color: '#002855',
          marginBottom: '20px',
          fontSize: '24px',
        }}
      >
        📍 Locations in Ohio County, WV
      </h2>

      {/* Debug info */}
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f0f0f0',
          marginBottom: '10px',
          fontSize: '14px',
        }}
      >
        <strong>Debug:</strong> React Simple Maps component loaded. Locations:{' '}
        {locations.length}
      </div>

      {/* React Simple Maps */}
      <div
        style={{
          height: '500px',
          width: '100%',
          marginBottom: '20px',
          border: '3px solid #FF0000', // Red border for debugging
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#e6f3ff', // Light blue background for debugging
        }}
      >
        <ComposableMap
          projection='geoAlbersUsa'
          projectionConfig={{
            scale: 4000,
            center: [-80.7, 40.06],
          }}
          width={800}
          height={500}
          style={{ width: '100%', height: '100%' }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              console.log('Geographies loaded:', geographies.length)
              return geographies
                .filter(d => {
                  console.log('Geography:', d.properties.NAME)
                  return d.properties.NAME === 'West Virginia'
                })
                .map(geo => {
                  console.log('Rendering West Virginia geography')
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill='#90EE90'
                      stroke='#002855'
                      strokeWidth={2}
                      style={{
                        default: { fill: '#90EE90', outline: 'none' },
                        hover: { fill: '#FFD700', outline: 'none' },
                        pressed: { fill: '#FFD700', outline: 'none' },
                      }}
                    />
                  )
                })
            }}
          </Geographies>

          {/* Add markers */}
          {locations.map((location, index) => {
            console.log(`Rendering marker ${index}:`, location.name)
            return (
              <Marker key={index} coordinates={location.coordinates}>
                <circle
                  r={12}
                  fill={
                    location.type === 'distribution' ? '#FF0000' : '#0000FF'
                  }
                  stroke='#FFFFFF'
                  strokeWidth={3}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  textAnchor='middle'
                  y={-18}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '14px',
                    fill: '#000000',
                    fontWeight: 'bold',
                    pointerEvents: 'none',
                  }}
                >
                  {index + 1}
                </text>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>

      {/* Simple legend - no icons */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #dee2e6',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
        }}
      >
        <h4 style={{ color: '#002855', margin: '0 0 10px 0' }}>Map Legend</h4>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#FF0000',
                border: '3px solid #fff',
              }}
            ></div>
            <span style={{ color: '#002855', fontSize: '16px' }}>
              🏥 Narcan Distribution
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#0000FF',
                border: '3px solid #fff',
              }}
            ></div>
            <span style={{ color: '#002855', fontSize: '16px' }}>
              🎓 Training Centers
            </span>
          </div>
        </div>
      </div>

      {/* Location Cards - no icons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '15px',
        }}
      >
        {locations.map((location, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #002855',
              backgroundColor:
                location.type === 'distribution' ? '#ffe6e6' : '#e6f0ff',
            }}
          >
            <h4
              style={{
                color: '#002855',
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 15px 0',
              }}
            >
              {index + 1}. {location.name}
            </h4>

            <p
              style={{
                color: '#666',
                fontSize: '14px',
                margin: '0 0 10px 0',
              }}
            >
              📍 {location.address}
            </p>

            <p
              style={{
                color: '#666',
                fontSize: '14px',
                margin: '0 0 10px 0',
              }}
            >
              📞 {location.phone}
            </p>

            <p
              style={{
                color: '#666',
                fontSize: '14px',
                margin: '0',
              }}
            >
              🕒 {location.hours}
            </p>

            <div
              style={{
                marginTop: '15px',
                padding: '8px 15px',
                borderRadius: '4px',
                backgroundColor:
                  location.type === 'distribution' ? '#FFD700' : '#87CEEB',
                color: '#002855',
                fontSize: '14px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {location.type === 'distribution'
                ? '💊 NARCAN AVAILABLE'
                : '🎓 TRAINING AVAILABLE'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NeighborMap

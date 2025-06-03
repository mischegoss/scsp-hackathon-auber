import React from 'react'

const VerifySection = ({
  needsNarcan,
  needsTraining,
  urgency,
  zipCode,
  locations,
}) => {
  // Filter locations by zip code
  const filteredLocations = locations.filter(location => {
    if (zipCode === 'prefer-not') {
      return true // Show all locations if user prefers not to answer
    }
    return location.zipCode === zipCode
  })

  const resourceCount = filteredLocations.length

  // Generate the acknowledgment message based on user's selections
  const getVerifyMessage = () => {
    if (needsNarcan && needsTraining) {
      return 'It looks like you want help locating narcan and finding training to save lives.'
    } else if (needsTraining) {
      return 'It looks like you want help finding narcan training to help save lives.'
    } else if (needsNarcan) {
      return 'It looks like you want help locating narcan to help save lives.'
    }
    return 'Thank you for your request.'
  }

  return (
    <div
      style={{
        backgroundColor: '#f0f8ff',
        border: '2px solid #4a90e2',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      <h3
        style={{
          color: '#002855',
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ✅ Thank You for Your Request
      </h3>

      <p
        style={{
          color: '#002855',
          fontSize: '1.1rem',
          lineHeight: '1.5',
          margin: '0 0 1rem 0',
        }}
      >
        {getVerifyMessage()}
      </p>

      <p
        style={{
          color: '#002855',
          fontSize: '1.1rem',
          lineHeight: '1.5',
          margin: '0 0 1rem 0',
        }}
      >
        There are <strong>{resourceCount}</strong> resources located in your zip
        code.
      </p>

      {urgency === 'urgent' && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '6px',
            padding: '1rem',
            marginTop: '1rem',
          }}
        >
          <p
            style={{
              color: '#856404',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              margin: 0,
              textAlign: 'center',
            }}
          >
            ⚠️ If this is an emergency, please contact 911.
          </p>
        </div>
      )}
    </div>
  )
}

export default VerifySection;

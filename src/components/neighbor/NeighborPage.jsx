
import React, { useState } from 'react'
import NeighborForm from './NeighborForm'
import NeighborMap from './NeighborMap'
import NeighborResources from './NeighborResources'
import styles from './styles.module.css'

const NeighborPage = () => {
  const [selectedNeeds, setSelectedNeeds] = useState([])
  const [zipCode, setZipCode] = useState('')
  const [urgency, setUrgency] = useState('')
  const [showResources, setShowResources] = useState(false)

  const handleFormSubmit = () => {
    setShowResources(true)
  }

  const handleBackToForm = () => {
    setShowResources(false)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {!showResources ? (
          <NeighborForm
            selectedNeeds={selectedNeeds}
            setSelectedNeeds={setSelectedNeeds}
            zipCode={zipCode}
            setZipCode={setZipCode}
            urgency={urgency}
            setUrgency={setUrgency}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                Resources in Ohio County, WV
              </h2>
              <button onClick={handleBackToForm} className={styles.backButton}>
                ← Back to form
              </button>
            </div>

            {/* React Simple Maps renders immediately - no delays needed */}
            <NeighborMap selectedNeeds={selectedNeeds} />

            <NeighborResources />
          </div>
        )}
      </div>
    </div>
  )
}

export default NeighborPage;
import React from 'react'
import { ExternalLink, AlertTriangle } from 'lucide-react'
import styles from './NeighborPage.module.css'

const NeighborResources = () => {
  const narcanResources = [
    {
      title: 'How to Use Narcan (Naloxone)',
      description:
        'Step-by-step guide on how to properly administer Narcan during an overdose emergency',
      url: 'https://www.cdc.gov/overdose-prevention/about/naloxone.html',
      organization: 'CDC',
    },
    {
      title: 'West Virginia Naloxone Program',
      description:
        'Information about free naloxone distribution and training programs in West Virginia',
      url: 'https://dhhr.wv.gov/bph/Pages/Naloxone-Program.aspx',
      organization: 'WV Department of Health',
    },
    {
      title: 'Recognizing an Overdose',
      description: 'Learn the signs of an opioid overdose and when to call 911',
      url: 'https://www.samhsa.gov/overdose-prevention/naloxone',
      organization: 'SAMHSA',
    },
  ]

  return (
    <div className={styles.resourcesContainer}>
      <h2 className={styles.sectionHeading}>Additional Narcan Resources</h2>

      <div className={styles.resourcesList}>
        {narcanResources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.resourceLink}
          >
            <div className={styles.resourceCard}>
              <div className={styles.resourceHeader}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <ExternalLink size={20} className={styles.externalIcon} />
              </div>
              <p className={styles.resourceDescription}>
                {resource.description}
              </p>
              <span className={styles.resourceOrg}>
                {resource.organization}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Emergency Resources */}
      <div className={styles.emergencySection}>
        <h3 className={styles.emergencyHeading}>
          <AlertTriangle className={styles.emergencyIcon} />
          Emergency Resources
        </h3>
        <div className={styles.emergencyGrid}>
          <div className={styles.emergencyCard}>
            <h4 className={styles.emergencyTitle}>Emergency Services</h4>
            <p className={styles.emergencyContact}>
              Call 911 for overdose emergencies
            </p>
          </div>
          <div className={styles.emergencyCard}>
            <h4 className={styles.emergencyTitle}>Crisis Hotline</h4>
            <p className={styles.emergencyContact}>
              1-800-273-8255 (24/7 Support)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NeighborResources;

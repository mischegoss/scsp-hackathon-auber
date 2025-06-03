import clsx from 'clsx'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Neighborhood Connect - Get Narcan',
    Image: require('@site/static/img/neighbor.png').default,
    link: '/neighbor-connect',
    description: (
      <>
        Find free or low-cost Narcan for your home and learn how to use it to
        keep your family and your neighbors safe.
      </>
    ),
  },
  {
    title: 'Community Connect - Provider Resources',
    Image: require('@site/static/img/community.png').default,
    link: '/',
    description: (
      <>
        Organizations can request Narcan supplies, report distribution needs,
        and coordinate training for their communities.
      </>
    ),
  },
  {
    title: 'Leaders Connect - Get Insights to Save Lives',
    Image: require('@site/static/img/leader2.png').default,
    link: '/',
    description: (
      <>
        Data-driven insights help public health leaders make smarter decisions
        about Narcan distribution and resource allocation.
      </>
    ),
  },
]

function Feature({ Image, title, description, link }) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      <Link
        to={link}
        style={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '0.5rem',
          padding: '1.5rem 1rem',
          boxShadow: '0 4px 6px rgba(0, 40, 85, 0.1)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 40, 85, 0.15)'
          e.currentTarget.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 40, 85, 0.1)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <div className='text--center'>
          <img
            src={Image}
            alt={title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className='text--center padding-horiz--md'>
          <Heading as='h3'>{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section style={{ padding: '2rem 0' }}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}


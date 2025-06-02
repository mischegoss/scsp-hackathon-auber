import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Neighborhood Connect - Get Narcan',
    Image: require('@site/static/img/neighbor.png').default,
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
    description: (
      <>
        Data-driven insights help public health leaders make smarter decisions
        about Narcan distribution and resource allocation.
      </>
    ),
  },
]

function Feature({ Image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img src={Image} alt={title} className={styles.featureImage} />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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

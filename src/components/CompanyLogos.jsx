import React from 'react';
import styles from './CompanyLogos.module.css';

export default function CompanyLogos() {
  const logos = [
    {
      name: 'OpenAI',
      logo: (
        <div className={styles.logoWrapper}>
          <img src="/sponsors/openai.svg" alt="OpenAI" className={styles.techIcon} />
        </div>
      )
    },
    {
      name: 'Sphere Hive',
      logo: (
        <div className={styles.logoWrapper}>
          <div className={styles.brandLockup}>
            <img src="/sponsors/spherehive.png" alt="Sphere Hive" className={styles.spherehiveIcon} />
            <span className={styles.brandText}>Sphere Hive</span>
          </div>
        </div>
      )
    },
    {
      name: 'Amazon',
      logo: (
        <div className={styles.logoWrapper}>
          <img src="/sponsors/amazon.svg" alt="Amazon" className={styles.techIcon} />
        </div>
      )
    },
    {
      name: 'KVGCE',
      logo: (
        <div className={styles.logoWrapper}>
          <div className={styles.brandLockup}>
            <img src="/sponsors/kvgce-logo.png" alt="KVGCE" className={styles.kvgceIcon} />
            <span className={styles.brandText}>KVGCE</span>
          </div>
        </div>
      )
    },
    {
      name: 'Walmart',
      logo: (
        <div className={styles.logoWrapper}>
          <img src="/sponsors/walmart.svg" alt="Walmart" className={styles.techIcon} />
        </div>
      )
    },
    {
      name: 'TCS',
      logo: (
        <div className={styles.logoWrapper}>
          <img src="/sponsors/tcs.svg" alt="TCS" className={styles.techIcon} />
        </div>
      )
    }
  ];

  // Duplicate list to ensure seamless transition in infinite scroll
  const marqueeItems = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className={styles.logosSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionHeading}>Engineering Standards Benchmarked Against Top Tech Teams</span>
      </div>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {marqueeItems.map((item, index) => (
            <div key={index} className={styles.logoItem}>
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

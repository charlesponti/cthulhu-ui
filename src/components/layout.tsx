import { Typography } from '@material-ui/core';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './layout.module.scss';

const name = 'Hominem';
export const siteTitle = 'Hominem';

const Layout = ({ children, isHome }) => (
  <div className={cx(styles.container)}>
    <Helmet>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Learn about TheCharlesPonti" />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
    <header className={styles.header}>
      <img src="/images/profile.jpg" className={cx(styles.headerImage)} alt={name} />
      <Typography variant="h4" className={styles.headerText}>
        <Link href="/">{name}</Link>
      </Typography>
    </header>
    <main>{children}</main>
    {!isHome && (
      <div className={styles.backToHome}>
        <Link href="/">Back to home</Link>
      </div>
    )}
  </div>
);

Layout.defaultProps = {
  isHome: false
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool
};
export default Layout;

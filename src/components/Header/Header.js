import React, { PropTypes as T } from 'react'
import {Link} from 'react-router'

import styles from './styles.module.css';

export class Header extends React.Component {
  render() {
    const {title} = this.props;

    return (
      <div className={styles.topbar}>
        <Link className={styles.logo} to="/"><h1>{title}</h1></Link>
        <section>
          pre alpha
        </section>
      </div>
    )
  }
}

Header.propTypes = {
  title: T.string
}

Header.defaultProps = {
  title: 'board'
}

export default Header

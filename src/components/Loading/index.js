import { Spin } from 'antd';
import styles from './index.less'

const View = props => {
  const {
    visible
  } = props
  if (visible) {
    return (
      <div className={styles.loading}>
        <Spin className={styles.loadingIcon} size="large" />
      </div>
    )
  } else {
    return <span></span>
  }
}

export default View

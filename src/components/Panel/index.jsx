import styles from './index.less';

const View = props => {
  const {
    header,
    children,
    extra,
  } = props

  return (
    <div className={styles.comPanel}>
      <div className={styles.header}>
        <span style={{marginRight: 20}}>
          {header}
        </span>
        {extra}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default View

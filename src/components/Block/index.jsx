import styles from './index.less';

const View = props => {
  const {
    title,
    children,
    extra,
    style,
    hideTitle
  } = props

  return (
    <div className={styles.panel} style={{...style}}>
      {!hideTitle &&
      <div className={styles.title}>
        <span style={{marginRight: 20}}>
          {title}
        </span>
        {extra}
      </div>
      }
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default View

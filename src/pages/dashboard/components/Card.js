import {Buttton} from 'antd'
import styles from './card.less'

const Card  = props => {
  const {
    item
  } = props
  return (
    <div className={styles.card}>
      <img src={item.icon} width={50} alt=""/>
      <div className={styles.info}>
        <span className={styles.title}>{item.name}</span>
        <span className={styles.number}>{item.number}</span>
      </div>
    </div>
  )
}

export default Card

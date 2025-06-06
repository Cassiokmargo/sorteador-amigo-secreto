import styles from './card.module.css'

const Card: React.FC = ({ children }) => {
  return (
    <div className={styles.card}>
        {children}
    </div>
  )
}

export default Card
import styles from './Start.module.css';
import girlImage from '../../assets/girl.png'

function Start() {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
            <h1 className={styles.title}>UmAI - СЕНИН <hr /> АДАБИЙ ДУЙНОН</h1>
            <p className={styles.subtitle}>Суйуктуу чыгармаларынды окуп, акылдуу ИИге суроо бер.</p>
        </div>
        <img className={styles.image} src={girlImage} alt="" />
      </div> 
    </>
  )
}

export default Start

import { partnersData } from "./partnersData";
import styles from '../team/team.module.css';

const Partners = () => {
  return (
    <div style={{
        // border: '2px solid red',
        position:'relative',
        padding:'2rem 0'
    }}>
        <h1 style={{
            position:'absolute',
            top:'4.6rem',
            left:'10rem',
            color:"var(--primary-50)",
        }} className={styles.teamHead}>Our Partners</h1>
        <div style={{
            border:'1px solid var(--primary-dark)',
            width: '85%',
            margin: ' 4rem auto',
            padding:'2rem 0',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
        }}>
            {
                partnersData.map((partner,index)=>{
                    return(
                        <img key={partner} src={partner.img} alt="" style={{margin:'1.5rem'}} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Partners
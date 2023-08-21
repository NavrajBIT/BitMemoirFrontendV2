import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './blog.module.css';

const BlogFullCard = () => {
    const router = useRouter();

    return (
        <div className={styles.blogFullCards} onClick={() => router.push('/blog/blogNum')}>
            <img src="/blog/blog.png" alt="" />
            <div style={{ margin: '0 1rem' }}>
                <div className={styles.blogMainText}>
                    <h2>The Need for Verified Digital Credentials : Building Trust in a Digital World</h2>
                </div>
                <span className={styles.blogText}>In today's increasingly digital world, where information can be easily manipulated and falsified, the need for verified digital credentials has become paramount. Traditional paper-based certificates and resumes no longer provide a reliable measure of a person's skills and qualifications. Employers, educational institutions, and individuals alike are seeking a more secure and trustworthy method to validate achievements and expertise. Read more </span>
                <Link href="/blog/blogNum" legacyBehavior>
                <a className={`${styles.blogText} ${styles.blogLink}`}>Read more</a>
            </Link>
            </div>
        </div>
    )
}

export default BlogFullCard
import Image from "next/image";
import styles from "./homeProfile.module.scss";

function HomeProfile() {
  return (
    <section className={styles.homeContainer}>
      <div className={styles.profileBox}>
        <Image src='/profile.jpg' width={300} height={300} alt='Profile' />
        <div className={styles.introduceBox}>
          <h1>SuIn Bae</h1>
          <span>
            전자공학과를 전공 반도체회사에서 근무,
            <br />
            디지털마케팅에 관심이 생겨 마케터가 되고, <br />
            콘텐츠가 아닌 어떠한 제품, 서비스를 위한 <br />
            웹사이트를 개발하기 위해 프론트엔드 개발자가 되었습니다. <br />
            <mark>즐겁고 재미있는 서비스와 SEO에 관심이 많습니다!</mark>
          </span>
        </div>
      </div>
    </section>
  );
}

export default HomeProfile;

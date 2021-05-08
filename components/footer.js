import Link from "next/link"

const styles = {}
export default function Footer() {
  return (
    <footer className={""}>
      <hr />
      <ul className={"container mx-auto flex justify-around py-4"}>
        <li className={styles.navItem}>
          <a href="https://github.com/nextauthjs/next-auth-example">Built with nextauthjs</a>
        </li>
        <li className={styles.navItem}>
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
      </ul>
    </footer>
  )
}

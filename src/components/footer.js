import Link from 'next/link'

const Footer = props => (
  <footer className="my-5 text-center pt-lg-4">
    <h2 className="h6 mb-4">Contact us</h2>

    <ul className="list-inline lead">
      <li className="list-inline-item mx-2">
        <Link href="https://twitter.com/2piFinance">
          <a target="_blank" rel="noreferrer" title="Tweet us!">
            <i className="bi-twitter"></i>
          </a>
        </Link>
      </li>
      <li className="list-inline-item mx-2">
        <Link href="https://github.com/2pifinance/">
          <a target="_blank" rel="noreferrer" title="Fork / inspect us!">
            <i className="bi-github"></i>
          </a>
        </Link>
      </li>
      <li className="list-inline-item mx-2">
        <Link href="https://discord.com/invite/h8VG2XcwvT">
          <a target="_blank" rel="noreferrer" title="Talk with us!">
            <i className="bi-discord"></i>
          </a>
        </Link>
      </li>
      <li className="list-inline-item mx-2">
        <Link href="https://2pifinance.medium.com">
          <a target="_blank" rel="noreferrer" title="Read us!">
            <i className="bi-file-text"></i>
          </a>
        </Link>
      </li>
      <li className="list-inline-item mx-2">
        <Link href="mailto:hello@2pi.finance">
          <a title="Email us!">
            <i className="bi-envelope"></i>
          </a>
        </Link>
      </li>
    </ul>
  </footer>
)

export default Footer

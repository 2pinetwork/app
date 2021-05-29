const Footer = props => (
  <footer className="my-5 border-top border-primary-dark border-1 text-center pt-4">
    <h2 className="h5">Contact us</h2>

    <ul className="list-inline lead">
      <li className="list-inline-item">
        <a href="https://twitter.com/2pi_finance" target="_blank" rel="noreferrer" title="Tweet us!">
          <i className="bi-twitter"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://github.com/2pifinance/" target="_blank" rel="noreferrer" title="Fork / inspect us!">
          <i className="bi-github"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="https://2pi_finance.medium.com" target="_blank" rel="noreferrer" title="Read us!">
          <i className="bi-file-text"></i>
        </a>
      </li>
      <li className="list-inline-item">
        <a href="mailto:hello@2pi.finance" title="Email us!">
          <i className="bi-envelope"></i>
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer

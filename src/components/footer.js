const Footer = props => (
  <footer className="my-5 text-center pt-lg-4">
    <h2 className="h6">Contact us</h2>

    <ul className="list-inline lead">
      <li className="list-inline-item mx-2">
        <a href="https://twitter.com/2piFinance" target="_blank" rel="noreferrer" title="Tweet us!">
          <i className="bi-twitter"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://github.com/2pifinance/" target="_blank" rel="noreferrer" title="Fork / inspect us!">
          <i className="bi-github"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://2pifinance.medium.com" target="_blank" rel="noreferrer" title="Read us!">
          <i className="bi-file-text"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="mailto:hello@2pi.finance" title="Email us!">
          <i className="bi-envelope"></i>
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer

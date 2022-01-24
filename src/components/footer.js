const Footer = props => (
  <footer className="my-5 text-center pt-lg-4">
    <h2 className="h6 mb-4">Contact us</h2>

    <ul className="list-inline lead">
      <li className="list-inline-item mx-2">
        <a href="https://twitter.com/2piNetwork" target="_blank" rel="noreferrer" title="Tweet us!">
          <i className="bi-twitter"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://github.com/2pinetwork/" target="_blank" rel="noreferrer" title="Fork / inspect us!">
          <i className="bi-github"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://discord.com/invite/h8VG2XcwvT" target="_blank" rel="noreferrer" title="Talk with us!">
          <i className="bi-discord"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://2pinetwork.medium.com" target="_blank" rel="noreferrer" title="Read us!">
          <i className="bi-medium"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="mailto:hello@2pi.network" title="Email us!">
          <i className="bi-envelope"></i>
        </a>
      </li>
      <li className="list-inline-item mx-2">
        <a href="https://github.com/2pinetwork/security/blob/master/bug-bounty.md" title="Report issues!">
          <i className="bi-bug"></i>
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer

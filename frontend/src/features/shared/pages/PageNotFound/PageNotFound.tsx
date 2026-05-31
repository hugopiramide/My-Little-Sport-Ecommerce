import { Link } from 'react-router-dom'
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-white">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-6 text-center">
          <h1 className="display-1 fw-black text-uppercase italic mb-0" style={{ letterSpacing: '-2px', fontWeight: 900 }}>
            404
          </h1>
          <h2 className="display-5 fw-bold text-uppercase mb-4">You've gone off track.</h2>
          <p className="lead mb-5 text-secondary">
            Even the best athletes lose their way. <br /> 
            Get back in the game and keep pushing.
          </p>
          
          <Link to="/" className="btn-dark-custom d-inline-block text-decoration-none">
            Back to Home
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
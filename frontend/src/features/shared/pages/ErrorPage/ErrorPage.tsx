import { Link } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-dark text-white">
      <div className="row w-100 justify-content-center text-center">
        <div className="col-10 col-lg-8">
          <div className="mb-4">
            <span className="badge rounded-pill bg-danger px-3 py-2 text-uppercase mb-3">Technical Foul</span>
          </div>
          <h1 className="display-3 fw-black text-uppercase mb-3" style={{ fontWeight: 900 }}>
            Something stopped the game.
          </h1>
          <p className="fs-5 mb-5 text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
            We're adjusting the strategy to get you back in action as soon as possible.
            Performance is our priority.
          </p>
          
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button 
              onClick={() => window.location.reload()} 
              className="btn-light-custom"
            >
              Retry Game
            </button>
            <Link 
              to="/" 
              className="btn-outline-light-custom"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
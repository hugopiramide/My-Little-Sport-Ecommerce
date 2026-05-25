import { Link, useLoaderData, useLocation, useNavigate, type LoaderFunction } from "react-router-dom"
import AuthModal from "../../auth/components/ModalAuth"
import { useEffect, useState } from "react"
import { isUserLoggedIn } from "../../auth/utils/authUtils"
import type { Page, ProductResponseDTO } from "../../shared/types"
import { ProductService } from "../services/ProductService"
import CardList from "../components/CardList"

type LoaderData = Page<ProductResponseDTO>

const loader: LoaderFunction = async () => {
    return await ProductService.getProducts(0, 4)
}

const Home = () => {
    const productsPage = useLoaderData() as LoaderData
    const productResponseList = productsPage?._embedded?.productResponseDTOList || []

    const location = useLocation()
    const navigate = useNavigate()
    const [alert, setAlert] = useState<string | null>(location.state?.message || null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('my_little_sport_welcome_modal')
        if (!hasSeen && !isUserLoggedIn()) {
            const timer = setTimeout(() => {
                setShowModal(true)
                document.body.classList.add('modal-open')
                sessionStorage.setItem('my_little_sport_welcome_modal', 'true')
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        if (alert) {
            navigate(location.pathname, { replace: true, state: {} })
            const timer = setTimeout(() => {
                setAlert(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [alert, navigate, location.pathname])

    const handleClose = () => {
        setShowModal(false)
        document.body.classList.remove('modal-open')
    }

    return (
        <>
            {alert && (
                <div className="bg-dark text-white text-center py-2">
                    {alert}
                </div>
            )}

            <AuthModal isOpen={showModal} onClose={handleClose} />

            <main className="container-fluid p-0 overflow-hidden">
                <section
                    id="homePicture"
                    className="position-relative w-100 overflow-hidden d-flex justify-content-center align-items-center h-90vh"
                    aria-labelledby="hero-heading"
                >
                    <video
                        src="/src/assets/video/peopleRunning.mp4"
                        className="position-absolute top-0 start-0 w-100 h-100 object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-hidden="true"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-overlay" />

                    <div className="position-relative text-center text-white z-1 px-3">
                        <h2 className="text-uppercase tracking-widest home-hero__eyebrow">MYLITTLESPORT</h2>
                        <h1 id="hero-heading" className="fw-black text-uppercase mb-4 home-hero__title">
                            WIN ON YOUR <br /> TERMS
                        </h1>
                        <Link to={"/articles"} className="btn-custom bg-white border-0 px-5 py-3">
                            Shop Now
                        </Link>
                    </div>
                </section>

                <section className="container pt-5 mt-5" aria-labelledby="essentials-heading">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <h2 id="essentials-heading" className="mb-0">The Essentials</h2>
                        <Link to="/articles" className="text-dark fw-bold text-uppercase small border-bottom border-2 pb-1" aria-label="View all essential products">View all</Link>
                    </div>
                    <div className="row g-4">
                        {!productResponseList.length ? (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted h4">No products found</p>
                            </div>
                        ) : (
                            <CardList products={productResponseList} />
                        )}
                    </div>
                </section>

                <section className="container py-5" aria-labelledby="trending-heading">
                    <h2 id="trending-heading" className="mb-5">Trending Now</h2>
                    <div className="row g-4">
                        <div className="col-12 col-md-4">
                            <article className="position-relative overflow-hidden group h-600 rounded-5px">
                                <img 
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200" 
                                    className="w-100 h-100 object-cover transition-all brightness-90"
                                    alt="Model wearing street style sports clothing"
                                    loading="lazy"
                                />
                                <div className="position-absolute bottom-0 start-0 p-4 w-100">
                                    <h4 className="text-white fw-black text-uppercase mb-3">Street Style</h4>
                                    <Link to="/articles" className="btn-custom bg-white border-0 py-2" aria-label="Explore Street Style collection">Explore</Link>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-md-4">
                            <article className="position-relative overflow-hidden group h-600 rounded-5px">
                                <img 
                                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200" 
                                    className="w-100 h-100 object-cover transition-all brightness-90"
                                    alt="Athlete running representing performance sportswear"
                                    loading="lazy"
                                />
                                <div className="position-absolute bottom-0 start-0 p-4 w-100">
                                    <h4 className="text-white fw-black text-uppercase mb-3">Performance</h4>
                                    <Link to="/articles" className="btn-custom bg-white border-0 py-2" aria-label="Explore Performance collection">Explore</Link>
                                </div>
                            </article>
                        </div>
                        <div className="col-12 col-md-4">
                            <article className="position-relative overflow-hidden group h-600 rounded-5px">
                                <img 
                                    src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200" 
                                    className="w-100 h-100 object-cover transition-all brightness-90"
                                    alt="Essential training gear and accessories"
                                    loading="lazy"
                                />
                                <div className="position-absolute bottom-0 start-0 p-4 w-100">
                                    <h4 className="text-white fw-black text-uppercase mb-3">Essentials</h4>
                                    <Link to="/articles" className="btn-custom bg-white border-0 py-2" aria-label="Explore Essentials collection">Explore</Link>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="container mb-5" aria-labelledby="dont-stop-heading">
                    <div className="bg-secondary-custom text-dark position-relative p-5 overflow-hidden min-h-450 rounded-5px">
                        <div className="row h-100 align-items-center">
                            <div className="col-lg-6 z-2">
                                <h2 id="dont-stop-heading" className="display-4 fw-black text-uppercase mb-4">Don't stop <br /> moving</h2>
                                <p className="lead mb-5 text-muted">Discover our new training collection designed to offer you maximum comfort and performance.</p>
                                <Link to="/articles" className="btn-dark-custom">
                                    Explore Collection
                                </Link>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200"
                            className="position-absolute end-0 top-0 h-100 w-50 object-cover d-none d-lg-block"
                            alt="Person working out representing our new training collection"
                            loading="lazy"
                        />
                    </div>
                </section>

                <section className="container mb-5" aria-labelledby="season-heading">
                    <div className="position-relative overflow-hidden w-100 h-700 rounded-5px">
                        <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600" 
                            className="w-100 h-100 object-cover brightness-70"
                            alt="New season 2026 sports collection overview"
                            loading="lazy"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-3">
                            <h5 className="text-uppercase tracking-widest mb-3">Season 2026</h5>
                            <h2 id="season-heading" className="display-1 fw-black text-uppercase mb-5">STYLE WITHOUT LIMITS</h2>
                            <Link to="/articles" className="btn-custom bg-white border-0 px-5 py-3">View Full Collection</Link>
                        </div>
                    </div>
                </section>

                <section className="container py-5 border-bottom border-top my-5" aria-label="Store features">
                    <div className="row text-center g-4">
                        <article className="col-md-4">
                            <h3 className="h4 fw-bold mb-2">Free Shipping</h3>
                            <p className="text-muted small mb-0">On orders over 50€</p>
                        </article>
                        <article className="col-md-4">
                            <h3 className="h4 fw-bold mb-2">Returns</h3>
                            <p className="text-muted small mb-0">You have 30 days to decide</p>
                        </article>
                        <article className="col-md-4">
                            <h3 className="h4 fw-bold mb-2">Exclusivity</h3>
                            <p className="text-muted small mb-0">Unique products just for you</p>
                        </article>
                    </div>
                </section>

                {!isUserLoggedIn() && (
                    <section className="bg-secondary-custom py-5 mt-5" aria-labelledby="member-advantage-heading">
                        <div className="container py-5 text-center">
                            <h2 id="member-advantage-heading" className="fw-black text-uppercase mb-4">Your Advantage as a Member</h2>
                            <p className="lead mb-5 text-muted mx-auto max-w-600">
                                Sign in to enjoy free fast shipping, access to exclusive collections, and experiences designed for athletes.
                            </p>
                            <Link to={'/register'} className="btn-dark-custom px-5" aria-label="Register to join as a member">Join Now</Link>
                        </div>
                    </section>
                )}
            </main>
        </>
    )
}

Home.loader = loader

export default Home
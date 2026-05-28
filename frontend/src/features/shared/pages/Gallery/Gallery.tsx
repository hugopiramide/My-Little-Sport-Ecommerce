import { Link } from 'react-router-dom'
import './Gallery.css'
import { useCallback, useEffect, useRef, useState } from 'react'

const categories = [
    {
        id: 'running',
        label: 'Running',
        description: 'Gear built for every stride, every pace, every road.',
        img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1400',
        alt: 'Runner on an open road at sunrise',
        size: 'large',
    },
    {
        id: 'training',
        label: 'Training',
        description: 'Forge strength with equipment that keeps up with you.',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900',
        alt: 'Athlete training intensely in the gym',
        size: 'small',
    },
    {
        id: 'outdoor',
        label: 'Outdoor',
        description: 'Adventure-ready gear for the trails and beyond.',
        img: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=900',
        alt: 'Hiker on a mountain trail with outdoor gear',
        size: 'small',
    },
    {
        id: 'lifestyle',
        label: 'Lifestyle',
        description: 'Style that moves with you from the court to the street.',
        img: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=1400',
        alt: 'Casual sportswear lifestyle look on urban street',
        size: 'wide',
    },
]

const carousel = [
    {
        id: 'c1', label: 'Sprint',
        img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=900',
        alt: 'Athlete sprinting on a running track',
    },
    {
        id: 'c2', label: 'Focus',
        img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900',
        alt: 'Focused athlete mid-workout',
    },
    {
        id: 'c3', label: 'Strength',
        img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=900',
        alt: 'Weightlifter showing strength during training session',
    },
    {
        id: 'c4', label: 'Move',
        img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=900',
        alt: 'Person jumping on a sports field full of energy',
    },
    {
        id: 'c5', label: 'Endure',
        img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=900',
        alt: 'Endurance runner pushing through the finish line',
    },
    {
        id: 'c6', label: 'Rise',
        img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=900',
        alt: 'Basketball player dunking on an outdoor court',
    },
    {
        id: 'c7', label: 'Speed',
        img: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900',
        alt: 'Road cyclist riding down a beautiful mountain path',
    },
    {
        id: 'c8', label: 'Precision',
        img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4b1ca?q=80&w=900',
        alt: 'Tennis player serving at high speed',
    },
]

const allImages = [
    ...categories.map(c => ({ img: c.img, alt: c.alt })),
    ...carousel.map(c => ({ img: c.img, alt: c.alt })),
]


const stats = [
    { id: 's1', value: 1200, suffix: '+', label: 'Athletes' },
    { id: 's2', value: 340,  suffix: '+', label: 'Products' },
    { id: 's3', value: 98,   suffix: '%', label: 'Satisfaction' },
    { id: 's4', value: 15,   suffix: '+', label: 'Brands' },
]

function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
            { threshold: 0.12 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return { ref, visible }
}

function useCountUp(target: number, active: boolean, duration = 1400) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!active) return
        const start = performance.now()
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [active, target, duration])

    return count
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const { ref, visible } = useScrollReveal()
    const count = useCountUp(value, visible)
    return (
        <div ref={ref} className={`gallery-stat reveal-item ${visible ? 'revealed' : ''}`}>
            <span className="gallery-stat__num">{count}{suffix}</span>
            <span className="gallery-stat__label">{label}</span>
        </div>
    )
}

const Gallery = () => {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragMoved, setDragMoved] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [lbIndex, setLbIndex] = useState<number | null>(null)

    const openLightbox = (index: number) => setLbIndex(index)
    const closeLightbox = () => setLbIndex(null)
    const prevImage = useCallback(() => {
        setLbIndex(i => (i == null ? null : (i - 1 + allImages.length) % allImages.length))
    }, [])
    const nextImage = useCallback(() => {
        setLbIndex(i => (i == null ? null : (i + 1) % allImages.length))
    }, [])

    useEffect(() => {
        if (lbIndex === null) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') prevImage()
            if (e.key === 'ArrowRight') nextImage()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [lbIndex, prevImage, nextImage])

    const onMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return
        setIsDragging(true)
        setDragMoved(false)
        setStartX(e.pageX - carouselRef.current.offsetLeft)
        setScrollLeft(carouselRef.current.scrollLeft)
    }
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !carouselRef.current) return
        e.preventDefault()
        setDragMoved(true)
        const x = e.pageX - carouselRef.current.offsetLeft
        carouselRef.current.scrollLeft = scrollLeft - (x - startX)
    }
    const stopDragging = () => setIsDragging(false)

    const gridReveal   = useScrollReveal()
    const statsReveal  = useScrollReveal()
    const momentReveal = useScrollReveal()

    return (
        <>
            {lbIndex !== null && (
                <div
                    id="gallery-lightbox"
                    className="gallery-lightbox"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image lightbox"
                >
                    <span className="gallery-lightbox__counter">
                        {lbIndex + 1} / {allImages.length}
                    </span>

                    <button className="gallery-lightbox__close" onClick={closeLightbox} aria-label="Close lightbox">
                        ✕
                    </button>

                    <button
                        className="gallery-lightbox__arrow gallery-lightbox__arrow--prev"
                        onClick={e => { e.stopPropagation(); prevImage() }}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    <img
                        key={lbIndex}
                        src={allImages[lbIndex].img}
                        alt={allImages[lbIndex].alt}
                        className="gallery-lightbox__img"
                        onClick={e => e.stopPropagation()}
                    />

                    <button
                        className="gallery-lightbox__arrow gallery-lightbox__arrow--next"
                        onClick={e => { e.stopPropagation(); nextImage() }}
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </div>
            )}

            <main className="bg-white min-vh-100">

                <section
                    id="gallery-hero"
                    className="gallery-hero position-relative overflow-hidden d-flex align-items-center justify-content-center"
                    aria-labelledby="gallery-hero-heading"
                >
                    <img
                        src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1800"
                        alt=""
                        aria-hidden="true"
                        className="position-absolute top-0 start-0 w-100 h-100 object-cover ken-burns"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 gallery-hero__overlay" />

                    <div className="position-relative z-1 text-center text-white px-3">
                        <h5 className="text-uppercase tracking-widest mb-3 gallery-hero__eyebrow">MyLittleSport</h5>
                        <h1 id="gallery-hero-heading" className="gallery-hero__title fw-black text-uppercase mb-4">
                            GALLERY
                        </h1>
                        <p className="gallery-hero__desc mb-5 mx-auto">
                            A visual journey through the sports and styles that define us.
                        </p>
                        <Link to="/articles" className="btn-custom bg-white border-0 px-5 py-3 text-dark">
                            Shop the Look
                        </Link>
                    </div>

                </section>

                <section
                    className="container py-5"
                    aria-labelledby="categories-heading"
                    ref={gridReveal.ref}
                >
                    <div className={`d-flex justify-content-between align-items-end mb-5 reveal-item ${gridReveal.visible ? 'revealed' : ''}`}>
                        <div>
                            <h2 id="categories-heading" className="mb-0">Explore by Category</h2>
                        </div>
                        <Link
                            to="/articles"
                            className="text-dark fw-bold text-uppercase small border-bottom border-2 pb-1"
                            aria-label="View all products"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="gallery-bento">
                        <article
                            className={`gallery-bento__large gallery-card position-relative overflow-hidden rounded-5px group reveal-item ${gridReveal.visible ? 'revealed' : ''}`}
                            style={{ transitionDelay: '0.05s' }}
                            onClick={() => openLightbox(0)}
                            role="button" tabIndex={0}
                            aria-label="Open Running category"
                            onKeyDown={e => e.key === 'Enter' && openLightbox(0)}
                        >
                            <img src={categories[0].img} alt={categories[0].alt}
                                className="gallery-card__img w-100 h-100 object-cover transition-all" loading="lazy" />
                            <div className="gallery-card__overlay position-absolute bottom-0 start-0 w-100 p-4">
                                <h3 className="text-white fw-black text-uppercase mb-2">{categories[0].label}</h3>
                                <p className="text-white opacity-75 small mb-3">{categories[0].description}</p>
                                <Link to="/articles" className="btn-custom bg-white border-0 py-2 px-4"
                                    onClick={e => e.stopPropagation()} aria-label="Shop Running">Shop</Link>
                            </div>
                        </article>

                        <div className="gallery-bento__stack">
                            {[1, 2].map((idx, delay) => (
                                <article
                                    key={categories[idx].id}
                                    className={`gallery-bento__small gallery-card position-relative overflow-hidden rounded-5px group reveal-item ${gridReveal.visible ? 'revealed' : ''}`}
                                    style={{ transitionDelay: `${0.1 + delay * 0.08}s` }}
                                    onClick={() => openLightbox(idx)}
                                    role="button" tabIndex={0}
                                    aria-label={`Open ${categories[idx].label} category`}
                                    onKeyDown={e => e.key === 'Enter' && openLightbox(idx)}
                                >
                                    <img src={categories[idx].img} alt={categories[idx].alt}
                                        className="gallery-card__img w-100 h-100 object-cover transition-all" loading="lazy" />
                                    <div className="gallery-card__overlay position-absolute bottom-0 start-0 w-100 p-3">
                                        <h4 className="text-white fw-black text-uppercase mb-2">{categories[idx].label}</h4>
                                        <Link to="/articles" className="btn-custom bg-white border-0 py-1 px-3"
                                            style={{ fontSize: '12px' }}
                                            onClick={e => e.stopPropagation()}
                                            aria-label={`Shop ${categories[idx].label}`}>Shop</Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <article
                            className={`gallery-bento__wide gallery-card position-relative overflow-hidden rounded-5px group reveal-item ${gridReveal.visible ? 'revealed' : ''}`}
                            style={{ transitionDelay: '0.26s' }}
                            onClick={() => openLightbox(3)}
                            role="button" tabIndex={0}
                            aria-label="Open Lifestyle category"
                            onKeyDown={e => e.key === 'Enter' && openLightbox(3)}
                        >
                            <img src={categories[3].img} alt={categories[3].alt}
                                className="gallery-card__img w-100 h-100 object-cover transition-all" loading="lazy" />
                            <div className="gallery-card__overlay position-absolute bottom-0 start-0 w-100 p-4">
                                <h3 className="text-white fw-black text-uppercase mb-2">{categories[3].label}</h3>
                                <p className="text-white opacity-75 small mb-3">{categories[3].description}</p>
                                <Link to="/articles" className="btn-custom bg-white border-0 py-2 px-4"
                                    onClick={e => e.stopPropagation()} aria-label="Shop Lifestyle">Shop</Link>
                            </div>
                        </article>
                    </div>
                </section>

                <div
                    className="gallery-stats"
                    ref={statsReveal.ref}
                    aria-label="Brand statistics"
                >
                    {stats.map(s => (
                        <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} />
                    ))}
                </div>

                <section
                    id="gallery-video"
                    className="gallery-video-section position-relative overflow-hidden d-flex align-items-center justify-content-center"
                    aria-labelledby="video-heading"
                >
                    <img
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800"
                        alt=""
                        aria-hidden="true"
                        className="position-absolute top-0 start-0 w-100 h-100 object-cover ken-burns ken-burns--slow"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.55)' }} />

                    <div className="position-relative z-1 text-center text-white px-3 py-5">
                        <h2 id="video-heading" className="fw-black text-uppercase mb-3">Behind the Movement</h2>
                        <p className="mb-5 mx-auto gallery-hero__desc opacity-75">
                            Watch how our athletes push limits — and how our gear pushes back.
                        </p>
                        <Link to="/articles" className="btn-custom bg-white border-0 px-5 py-3 text-dark">
                            Discover More
                        </Link>
                    </div>
                </section>

                <section
                    className="py-5"
                    aria-labelledby="moments-heading"
                    ref={momentReveal.ref}
                >
                    <div className={`container mb-4 reveal-item ${momentReveal.visible ? 'revealed' : ''}`}>
                        <div className="d-flex justify-content-between align-items-end">
                            <div>
                                <h2 id="moments-heading" className="mb-0">Captured Moments</h2>
                            </div>
                            <span className="text-muted small d-none d-md-block">← Drag to explore →</span>
                        </div>
                    </div>

                    <div
                        id="gallery-carousel"
                        ref={carouselRef}
                        className={`gallery-carousel ${isDragging ? 'gallery-carousel--dragging' : ''}`}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={stopDragging}
                        onMouseLeave={stopDragging}
                        role="region"
                        aria-label="Photo carousel"
                    >
                        {carousel.map((item, idx) => (
                            <div
                                key={item.id}
                                className="gallery-carousel__item position-relative overflow-hidden rounded-5px"
                                onClick={() => { if (!dragMoved) openLightbox(categories.length + idx) }}
                                role="button" tabIndex={0}
                                aria-label={`Open photo: ${item.label}`}
                                onKeyDown={e => e.key === 'Enter' && openLightbox(categories.length + idx)}
                            >
                                <img
                                    src={item.img} alt={item.alt}
                                    className="gallery-carousel__img w-100 h-100 object-cover"
                                    loading="lazy" draggable={false}
                                />
                                <div className="gallery-carousel__label position-absolute bottom-0 start-0 w-100 p-3">
                                    <span className="text-white fw-black text-uppercase fs-5">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="gallery-carousel__dots d-flex justify-content-center gap-2 mt-3" aria-hidden="true">
                        {carousel.map((_, i) => (
                            <button
                                key={i}
                                className="gallery-carousel__dot"
                                onClick={() => {
                                    if (!carouselRef.current) return
                                    const itemW = carouselRef.current.scrollWidth / carousel.length
                                    carouselRef.current.scrollTo({ left: itemW * i, behavior: 'smooth' })
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>

                <section className="container mb-5" aria-labelledby="gallery-cta-heading">
                    <div className="gallery-cta position-relative overflow-hidden rounded-5px">
                        <img
                            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1600"
                            className="w-100 h-100 object-cover brightness-60"
                            alt="Athletes celebrating after a race"
                            loading="lazy"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle text-center text-white w-100 px-3">
                            <h5 className="text-uppercase tracking-widest mb-3 opacity-75">Season 2026</h5>
                            <h2 id="gallery-cta-heading" className="display-4 fw-black text-uppercase mb-5">
                                PLAY YOUR WAY
                            </h2>
                            <Link to="/articles" className="btn-custom bg-white border-0 px-5 py-3 text-dark">
                                View Full Collection
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default Gallery

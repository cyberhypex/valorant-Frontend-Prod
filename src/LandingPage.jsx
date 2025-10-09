import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import li from './assets/landingImage.jpg';
import { NavBar } from './NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export function LandingPage() {
    const location = useLocation();

   
    useEffect(() => {
        const loader = document.getElementById("global-loader");
        if (loader) {
            loader.style.transition = "opacity 0.3s ease";
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 300); // Remove loader after fade-out
        }
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    // Show welcome content only on the root route "/"
    const isHome = location.pathname === '/';

    return (
        <div className="position-relative min-vh-100 w-100 overflow-hidden">
            {/* Background Image */}
            <img 
                src={li} 
                alt="Valo Image" 
                className="img-fluid position-fixed top-0 start-0 object-fit-cover" 
                style={{ 
                    zIndex: -1, 
                    height: '100vh', 
                    width: '100vw', 
                    filter: 'brightness(25%)', 
                    objectFit: 'cover' 
                }}
            />

            {/* Navbar */}
            <NavBar />

            {/* Centered Welcome Text - Only on Home */}
            {isHome && (
                <div 
                    className="d-flex justify-content-center align-items-center flex-column text-center"
                    style={{
                        height: '100vh',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 1,
                        color: 'white',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                        fontFamily: "'Bebas Neue', sans-serif",
                        padding: '0 20px'
                    }}
                >
                    <h1 className="display-2" style={{ fontWeight: '900', color: '#ff4655' }}>
                        Valorant Explorer
                    </h1>
                    <p className="lead" style={{ maxWidth: '700px', fontSize: '1.4rem' }}>
                        Dive into the world of Valorant. Discover agents, master maps, explore weapons and conquer every mode — all at your fingertips.
                    </p>

                    {/* Extra content below */}
                    <div style={{ fontFamily: "'Orbitron', sans-serif", marginTop: '30px', fontSize: '1rem' }}>
                        <p>
                            Created with ❤️ by{' '}
                            <a 
                                href="https://www.linkedin.com/in/anshuman-gogoi-b99671211/" 
                                target="_blank" 
                                rel="noreferrer" 
                                style={{ 
                                    color: '#0a66c2', 
                                    fontWeight: 'bold', 
                                    textDecoration: 'none' 
                                }}
                            >
                                Anshuman Gogoi
                            </a>
                        </p>
                        <p>
                            Lots of love and thanks to{' '}
                            <a 
                                href="https://playvalorant.com/en-us/" 
                                target="_blank" 
                                rel="noreferrer" 
                                style={{ 
                                    color: '#ff4655', 
                                    fontWeight: 'bold', 
                                    textDecoration: 'none' 
                                }}
                            >
                                Valorant
                            </a>
                        </p>
                    </div>
                </div>
            )}

            {/* Nested Routes */}
            <div style={{ paddingTop: '80px', zIndex: 1, position: 'relative' }}>
                <Outlet />
            </div>
        </div>
    );
}

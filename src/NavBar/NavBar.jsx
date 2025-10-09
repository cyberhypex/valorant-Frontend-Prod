import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function NavBar({ textColor = '#ff6666', onMenuToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onMenuToggle) {
            onMenuToggle(newState);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
                if (onMenuToggle) onMenuToggle(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <>
            {/* Dark Overlay */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 9 }}
                ></div>
            )}

            {/* NavBar */}
            <nav
                ref={navRef}
                className="navbar navbar-expand-lg navbar-dark position-fixed top-0 start-0 w-100 px-3"
                style={{
                    zIndex: 10,
                    backgroundColor: scrolled || isOpen ? 'rgba(0,0,0,0.95)' : 'transparent',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                    boxShadow: scrolled ? '0 4px 12px rgba(0,0,0,0.4)' : 'none',
                }}
            >
                <div className="container-fluid">
                    {/* Hamburger Button */}
                    <button
                        className="navbar-toggler d-lg-none border-0 ms-auto d-flex align-items-center justify-content-center"
                        type="button"
                        onClick={toggleMenu}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            width: '30px',
                            height: '30px',
                            padding: 0,
                            borderRadius: '4px',
                        }}
                    >
                        <span
                            className="navbar-toggler-icon"
                            style={{
                                filter:
                                    'brightness(0) saturate(100%) invert(24%) sepia(99%) saturate(7492%) hue-rotate(348deg) brightness(102%) contrast(108%)',
                                transform: 'scale(0.7)',
                            }}
                        ></span>
                    </button>

                    {/* Nav Items */}
                    <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`}>
                        <ul
                            className="navbar-nav mx-auto text-center"
                            style={{
                                fontWeight: 'bold',
                                
                                gap: '20px',
                                backgroundColor: isOpen ? 'black' : 'transparent',
                                padding: isOpen ? '1rem' : '0',
                            }}
                        >
                            {[
                                { name: 'Home', to: '/' },
                                { name: 'Agents', to: '/agents' },
                                { name: 'Game Modes', to: '/gamemodes' },
                                { name: 'Map', to: '/maps' },
                                { name: 'Weapons', to: '/weapons' },
                                { name: 'Competitive Tier', to: '/competetiers' },
                            ].map(({ name, to }) => (
                                <li className="nav-item me-3" key={name}>
                                    <Link
                                        className="nav-link"
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            color: textColor,
                                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                            transition: 'color 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = 'white')}
                                        onMouseLeave={(e) => (e.target.style.color = textColor)}
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

import { Container, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import "./navbar.mobile.scss";
import { NavLink } from 'react-router-dom'
import logo from "../../assets/img/logo.png"
import menu from "../../assets/icons/menu.svg"
import { HeadphonesSharp } from '@mui/icons-material';
function Navbar() {
  const [active, setActive] = useState(false)
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) ? JSON.parse(localStorage.getItem("theme")) : "dark-theme")

  useEffect(() => {
    document.documentElement.classList = theme
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  const handleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme")
    } else {
      setTheme("dark-theme")
    }
  }
  return (
    <header className='main-header'>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
          <div className="header-left">
            <NavLink to="/" className="logo-cover">
              <div className='logo'>
                <img src={logo} alt="" />
              </div>
              <Typography variant="h4">
                Movieland
              </Typography>
            </NavLink>
            <button className='mode-btn btn btn-regular' onClick={handleTheme}>{theme ==="dark-theme" ? "Dark mode":"Light mode"}</button>
          </div>
          <nav className='main-navbar'>
            <ul className="menu-list">
              <li>
                <NavLink to="/" className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }>Home</NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={({ isActive }) =>
                  isActive ? "active-link" : undefined
                }>Favorites</NavLink>
              </li>
            </ul>
            <button className="menu-btn"
              onClick={() => setActive(!active)}
            >
              <img src={menu} alt="" />
            </button>
            <div className={`mobile-sidebar ${active ? "active" : ""}`}
              onClick={() => setActive(!active)}
            >
              <div className={`sidebar-inner ${active ? "active" : ""}`}
                onClick={(e) => e.stopPropagation()}>
                <div className="sidebar-header">
                  <button onClick={()=>setActive(false)} className='btn btn-regular btn-contained'>Close</button>
                  <button className='btn btn-regular' onClick={handleTheme}>{theme ==="dark-theme" ? "Dark mode":"Light mode"}</button>
                </div>
                <ul className="menu-list mobile">
                  <li>
                    <NavLink to="/" className={({ isActive }) =>
                      isActive ? "active-link" : undefined
                    }>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/favorites" className={({ isActive }) =>
                      isActive ? "active-link" : undefined
                    }>Favorites</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </Box>
      </Container>
    </header >
  )
}

export default Navbar
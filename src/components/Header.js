import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

export default function Header() {
	const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
	return (
		<Navbar
			className={darkMode ? "text-bg-dark" : "text-bg-light"}
			fixed="top"
			expand="lg"
			style={{ opacity: 95 + "%" }}
		>
			<Container>
				<Navbar.Brand className="m-0 m-lg-2" href="/#home">
					<img src="/profile.png" alt="logo" width={64} height={64} />
				</Navbar.Brand>
				<Button
					variant={darkMode ? "light" : "dark"}
					className="btn-lg"
					onClick={() => toggleDarkMode()}
				>
					{darkMode ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
				</Button>
				<Navbar.Toggle
					className={darkMode ? "bg-light" : "bg-dark"}
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav
						className="w-100 justify-content-end"
						style={{ gap: 50 + "px" }}
					>
						<Nav.Link
							className="fs-4 fw-light text-reset"
							href="/#home"
						>
							Sign in
						</Nav.Link>
						<Nav.Link
							className="fs-4 fw-light text-reset"
							href="/#contact"
						>
							Register
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

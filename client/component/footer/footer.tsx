import React from "react";
import "./footer.css";

export default function Footer(prop: {}) {
    return (
        <>
            <footer>
                <div className="footer-top-line"></div>
                <div className="footer-container">
                    <div>
                        <div className="header-logo footer-logo">
                            <p className="header-recipe">RECIPE</p>
                            <p className="header-harmony">HARMONY</p>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div className="footer-contact-container">
                            <p className="footer-contact">Contact</p>
                            <div>
                                <span className="material-icons">email</span>
                                <p>contact@example.com</p>
                            </div>
                            <div>
                                <span className="material-icons">phone</span>
                                <p>012-345 67 89</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

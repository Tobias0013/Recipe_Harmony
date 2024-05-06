import React from "react";
import { TeamMember, team } from "../../component/about/team";
import { productInfo } from "../../component/about/product_info"; 
import "./about.css";

const AboutPage: React.FC = () => {
    return (
        <div className="about-container">
            <h1 className="about-heading">About Us</h1>
            <p className="product-info">{productInfo}</p>
            <h2 className="about-heading">Our Team</h2>
            {team.map((member: TeamMember, index: number) => (
                <div className="team-member" key={index}>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <p className="bio">{member.bio}</p>
                </div>
            ))}
        </div>
    );
};

export default AboutPage;

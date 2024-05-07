import React from "react";
import { TeamMember, team } from "../../component/about/team";
import { productInfo } from "../../component/about/product_info"; 
import "./about.css";

const AboutPage: React.FC = () => {
    return (
        <div className="about-container">
            <p className="product-info">{productInfo}</p>
            {team.map((member: TeamMember, index: number) => (
                <div className="team-member" key={index}>
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
            ))}
        </div>
    );
};

export default AboutPage;

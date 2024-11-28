import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="sarah-content">
        <div className="sarah-pic">
          <a href="https://portfolio-sarah-jiang.netlify.app/">
            <img src="/Sarah.jpg" alt="Sarah" />
          </a>
        </div>
        <div className="sarah-info">
          <p>Sarah Jiang</p>
          <div className="sarah-contact">
            <a href="https://github.com/o0saraho0">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/sarah-yue-jiang">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

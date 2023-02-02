import './Model4.css'
import StevenDuong from '../Assets/StevenDuong.jpg';
import BrandonMatran from '../Assets/BrandonMatran.png';
import AllenChen from '../Assets/AllenChen.jpg';
import XueYu from '../Assets/XueYu.png';
import MuradKhudiev from '../Assets/MuradKhudiev.png';


export default function Model4() {
  return (
    <div id='model4'>
        <h1 className='model-title'></h1>
        <div className="divider"></div>
        <div className="members">

        <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/in/murad-khudiev-4398a91bb/">
          <div className="member">
            <img width={150} height={150} src={MuradKhudiev}/>
            <div className="description">
                <h1>Murad Khediev</h1>
                <h2>Full Stack Web Developer</h2>
                <p>
                Murad is a Full Stack Web Developer who has expertise in both front-end and back-end web development. He has a comprehensive understanding of how the various components of a web application work together to create a seamless user experience.
                </p>
            </div>
          </div>
        </a>
        <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/in/allen-chen-swe/">
          <div className="member">
            <img width={150} height={150} src={AllenChen}/>
            <div className="description">
                <h1>Allen Chen</h1>
                <h2>Full Stack Web Developer</h2>
                <p>
                Allen is a Full Stack Web Developer who has a complete understanding of both front-end and back-end development, and can design, develop, and deploy a dynamic website from start to finish.
                </p>
            </div>
          </div>
        </a>
        <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/in/xueyu-/">
          <div className="member">
            <img width={150} height={150} src={XueYu}/>
            <div className="description">
                <h1>Xue Yu</h1>
                <h2>Full Stack Web Developer</h2>
                <p>
                Xue is a Full-Stack web developer who is well-versed in various programming languages such as HTML, CSS, JavaScript for the front-end and Python for the back-end. She is also familiar with web technologies such as databases, servers, and APIs.
                </p>
            </div>
          </div>
        </a>
        <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/in/brandon-matran/">
          <div className="member">
            <img width={150} height={150} src={BrandonMatran}/>
            <div className="description">
                <h1>Brandon Matran</h1>
                <h2>Full Stack Web Developer</h2>
                <p>
                Brandon is a Full-Stack web developer responsible for working on both front-end and back-end development processes. He designs, develops, and maintains fully-fledged functioning applications with databases and servers.
                </p>
            </div>
          </div>
          </a>
          <a style={{textDecoration: 'none'}} href="https://www.linkedin.com/in/steven-duy-duong/">
          <div className="member">
            <img width={150} height={150} src={StevenDuong}/>
            <div className="description">
                <h1>Steven Duong</h1>
                <h2>Full Stack Web Developer</h2>
                <p>
                Steven is a Full Stack Web Developer who possesses a strong understanding of how to build responsive and user-friendly websites, and has the ability to solve problems and debug code across the entire development stack.
                </p>
            </div>
          </div>
          </a>
        </div>
    </div>
  );
}

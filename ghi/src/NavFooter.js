import background_image from "./images/background_image.png";

function NavFooter() {
  return (
    <div className="container" id="footer-container">
      <footer
        className="footer"
        id="footer"
        style={{ backgroundImage: `url(${background_image})` }}
      ></footer>
    </div>
  );
}

export default NavFooter;

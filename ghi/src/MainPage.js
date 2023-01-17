// import background_image from "../images/background_image.png";
// import programmer from "../images/programmer.jpg";
import { useNavigate } from "react-router";

function MainPage() {
  const navigate = useNavigate();

  const signupClick = async (e) => {
    navigate("/signup");
  };

  return (
    <section
      className="vh-100"
      // style={{ backgroundImage: `url(${background_image})` }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="w-100">
                    <div>
                      <div className="container max-width">
                        <div className="d-flex flex-row-reverse">
                          <button
                            onClick={() => signupClick()}
                            type="button"
                            className="signup btn btn-primary btn-lg text-right"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="d-flex flex-row-reverse">
                          <button
                            type="button"
                            className="signup btn btn-primary btn-lg text-right"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      <img
                        // src={programmer}
                        className="programmer img-fluid"
                        alt="programmer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPage;

// function MainPage() {
//   return (
//     <div className="px-4 py-5 my-5 text-center">
//       <h1 className="display-5 fw-bold">ANCHOR</h1>
//       <div className="col-lg-6 mx-auto">
//         <p className="lead mb-4">anchor!</p>
//       </div>
//     </div>
//   );
// }

// export default MainPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Login } from "../../services/AuthService";
import GuestMiddleware from "../../middleware/GuestMiddlewre";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  GuestMiddleware();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const data: any = await Login(email, password);
    data.status_code == 200
      ? (window.location.href = "/")
      : setError(data.message);
  };

  return (
    <>
      <Helmet>
        {/* Import CSS */}
        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* Import JavaScript */}
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/main.js"></script>
      </Helmet>

      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email & password to login
                        </p>
                      </div>

                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}

                      <form
                        className="row g-3 needs-validation"
                        onSubmit={handleLogin}
                      >
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Email
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <div className="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default LoginPage;

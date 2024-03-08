const AuthenticateMiddleware = () => {
  if (!sessionStorage.getItem("token")) {
    window.location.href = "/login";
  }
};

export default AuthenticateMiddleware;

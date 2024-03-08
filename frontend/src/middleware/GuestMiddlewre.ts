const GuestMiddleware = () => {
  if (sessionStorage.getItem("token")) {
    window.location.href = "/";
  }
};

export default GuestMiddleware;

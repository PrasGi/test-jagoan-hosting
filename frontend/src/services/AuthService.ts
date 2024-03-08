const Login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await response.json();

  if (data.status_code === 200) {
    sessionStorage.setItem("token", data.data.token);
    sessionStorage.setItem("user", data.data.user);
  }

  console.log(data.status_code === 200);
  return data;
};

const Logout = async () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  window.location.href = "/login";
};

export { Login, Logout };

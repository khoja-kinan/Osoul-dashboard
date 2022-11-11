useEffect(() => {
  async function checkUser() {
    if (cookies.user != null) {
      const result = await login(rememberToken);
      if (result != null && result.status === 1) {
        setCookie("api-token", result.token);
        setCookie("user", JSON.stringify(result.user));
      }
    } else {
      navigate("/login");
    }
  }
  checkUser();
}, [navigate]);

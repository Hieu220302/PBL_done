import HeaderLogin from "./headerLogin/HeaderLogin";

function layout_login({ children }) {
  return (
    <>
      <HeaderLogin />
      <div>{children}</div>
    </>
  );
}

export default layout_login;

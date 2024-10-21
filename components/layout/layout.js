import MainHeader from "./main-header";
import classes from "./layout.module.css";

// contains the header and the main content of the page which the _app.js send it.
function Layout(props) {
  return (
    <div>
      <MainHeader />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

import { redirectUser } from "../../utils/auth";

const Auth = (Component) => {
  const requireAuth = (props) => {
    return <Component {...props} />;
  };

  requireAuth.getInitialProps = (ctx) => {
    // if no user existed, redirect
    if (!ctx.user) redirectUser(ctx, "/login");

    let pageProps;
    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }
    return pageProps;
  };
  return requireAuth;
};
export default Auth;

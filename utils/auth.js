import Router from "next/router";
import cookie from "js-cookie";

export const handleLogin = (token) => {
  cookie.set("token", token);
  Router.push("/account");
};

export const redirectUser = (ctx, location) => {
  if (ctx && ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const logoutUser = () => {
  cookie.remove("token");
  Router.push("/login");
};

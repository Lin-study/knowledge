import login from "./login.js";
import shop from "./shop.js";
import myserver from "../request/getrequest.js";
myserver.parseRouter('login',login);
myserver.parseRouter('shop',shop);
export  default myserver;
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import { REACT_APP_AUTH0_AUDIENCE } from "../config";

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-g53bzd7b.au.auth0.com/.well-known/jwks.json",
  }),
  audience: REACT_APP_AUTH0_AUDIENCE,
  issuer: "https://dev-g53bzd7b.au.auth0.com/",
  algorithms: ["RS256"],
});

export default checkJwt;

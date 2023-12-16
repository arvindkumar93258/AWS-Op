import express from "express";

import { getSignedUrl } from "../Controller/image-controller.js";

const routes = express.Router();

routes.get('/image-url', getSignedUrl);

export default routes;

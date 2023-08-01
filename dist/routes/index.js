"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const country_routes_1 = require("./location/country.routes");
const state_routes_1 = require("./location/state.routes");
const city_routes_1 = require("./location/city.routes");
exports.APIRoutes = (0, express_1.Router)();
exports.APIRoutes.get('/', (req, res) => {
    res.send("Inside API call");
});
exports.APIRoutes.use('/auth', auth_routes_1.AuthRoutes);
exports.APIRoutes.use('/location/country', country_routes_1.countryRoutes);
exports.APIRoutes.use('/location/state', state_routes_1.StateRoutes);
exports.APIRoutes.use('/location/city', city_routes_1.cityRoutes);

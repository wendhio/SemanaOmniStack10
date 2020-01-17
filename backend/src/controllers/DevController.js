const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/ParseStringAsArray");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      // https://api.github.com/users/wendhio
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      let { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  }
};

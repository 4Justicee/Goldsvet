const axios = require("axios");
const { PROMO_HOST } = process.env;

exports.Promo_Active = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/active`;

    try {
        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Race_Details = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/race/details`;

    try {
        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Race_Prizes = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/race/prizes`;

    try {
        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Tournament_Details = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/tournament/details`;

    try {
        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Race_Winners = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/race/winners`;

    try {

        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.post(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Tournament_v2_leaderboard = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/tournament/v2/leaderboard`;

    try {

        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Promo_Tournament_v3_leaderboard = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/tournament/v3/leaderboard`;

    try {

        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

exports.Frb_Available = async (req, res) => {
    const url = `${PROMO_HOST}/api/promo/frb/available`;

    try {

        // logger.info(`[Promo]:           ${url}`);

        const response = await axios.get(url);

        return res.json({ ...response.data });
    } catch (error) {
        logger.info(`[Promo]:              ${url}`);
        logger.info(error.message);
        return res.json({});
    }
};

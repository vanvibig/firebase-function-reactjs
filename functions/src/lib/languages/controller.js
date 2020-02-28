const languages = require("./languages.json");

function getAllLanguages(_req, res) {
    return res.json({
        success: true,
        data: languages
    });
}

function getLanguage(req, res) {
    const requiredLang = req.params.language;
    const language = languages[requiredLang];

    return res.status(!!language ? 200 : 404)
        .json({
            success: !!language,
            data: language ? language : "language not found"
        });
}

module.exports = {
    getAllLanguages,
    getLanguage
};

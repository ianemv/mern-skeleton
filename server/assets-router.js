const express = require("express");
const router = express.Router();
const imageRegex = /\.(png|jpg|jpeg|gif|svg)$/i;
const viewRegex = /\/.+\.(mp4|ogv|webm)$/i;
router.get(imageRegex, (req, res) => {
	const filePath = req.path;
	res.redirect(303, `http://localhost:3000/src/${filePath}`);
});

router.get(viewRegex, (req, res) => {
	const filePath = req.path;
	res.redirect(303, `http://localhost:3000/src/${filePath}`);
});

module.exports = router;
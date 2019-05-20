function logout(req, res) {
  res.cookie("nekot_htua", "");
  res.redirect("/");
}

module.exports = logout;

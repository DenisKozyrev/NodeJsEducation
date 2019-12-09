exports.getNotFoundPage = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found Page",
    path: null
    // layout: false /* for handlebars*/
  });
};

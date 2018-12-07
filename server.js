const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes" )(app);
require("./app/routing/htmlRoutes")(app); //! important to have this require as last, htmlRoutes contains 'catch-all' route

app.listen(PORT, () => {
  // console.log(`App listening on http://localhost:${PORT}`);
});
import app from "./app";
import secret from "./keys";

console.log(secret);

const port = 5050;

app.listen(port, () => console.log("data server running on port", port));

import app from "./app";
import { hostname, port } from "./properties";

app.listen(port, () =>
    console.log(`Server running. URL: http://${hostname}:${port}`)
);
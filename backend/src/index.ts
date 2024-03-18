import { buildApi } from "./api/api";

const port = 3000;

const api = buildApi();
api.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

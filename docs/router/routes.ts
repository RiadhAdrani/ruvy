import { RawRoute } from "@riadh-adrani/ruvy";

interface DocRoute extends RawRoute {
  componentOrFile: string | JSX.Element;
}

const routes: Array<RawRoute> = [];

export default routes;

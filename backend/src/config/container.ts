import { Container } from "typedi";
import { useContainer } from "routing-controllers";

export const setupContainer = () => {
  useContainer(Container);
};

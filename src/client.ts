import { APY_ENDPOINT, BASE_URL, FARM_PROPERTY } from "./constants";
import { IReturn } from "./interfaces/IReturn";

export class ElevenClient {
  async getReturns(): Promise<IReturn[]> {
    try {
      const apiUrl = BASE_URL  + APY_ENDPOINT;
      const result = await fetch(apiUrl).then((r) => r.json());
      const keys = Object.keys(result);

      const resultAsArray = keys
        .filter((k) => {
          return typeof result[k] === "object" && result[k] !== null;
        })
        .map((k) => {
          return { ...result[k], name: k };
        })
        .filter((el) => el.hasOwnProperty(FARM_PROPERTY))
        .filter((el) => el.farm.aprd != 0 && el.farm.aprd != null);

      const filteredForFarms: IReturn[] = resultAsArray.map((el) => {
        return {
          name: el.name as string,
          aprd: el.farm.aprd as number,
          apr: el.farm.aprd * 365,
          apry: el.farm.apry as number,
        };
      });

      return filteredForFarms;
    } catch (error) {
      throw error;
    }
  }
}

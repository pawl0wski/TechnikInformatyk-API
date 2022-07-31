import CacheService from "../cacheService";
import EnvironmentConfig from "../../../config/environmentConfig";

export default async function useCache(
    name: string,
    ifObjectIsNotInCache: () => Promise<any>
) {
    if (EnvironmentConfig.cacheEnabled) {
        const cacheService = CacheService.getInstance();
        const cachedData = await cacheService.getObjectFromCache(name);
        if (cachedData !== null) return cachedData;

        const object = await ifObjectIsNotInCache();
        await cacheService.saveObjectToCache(name, object);
        return object;
    }
}

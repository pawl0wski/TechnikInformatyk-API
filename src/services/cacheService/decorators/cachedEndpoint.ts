import CacheService from "../cacheService";
import EnvironmentConfig from "../../../config/environmentConfig";

export default function CachedEndpoint(name: string) {
    return function (
        target: any,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        if (EnvironmentConfig.cacheEnabled) {
            const original = descriptor.value;

            descriptor.value = async function (...args: any[]) {
                const cacheService = CacheService.getInstance();
                const cachedData = await cacheService.getObjectFromCache(name);
                if (cachedData !== null) return cachedData;

                const value = await original.apply(this, args);
                await cacheService.saveObjectToCache(name, value);
                return value;
            };
        }
    };
}

import CacheService from "../cacheService";

export default function CacheEndpoint(name: string) {
    return function (
        target: any,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheService = CacheService.getInstance();
            const cachedData = await cacheService.getObjectFromCache(name);
            if (cachedData !== null) return cachedData;

            const value = await original.apply(this, args);
            await cacheService.saveObjectToCache(name, value);
            return value;
        };
    };
}

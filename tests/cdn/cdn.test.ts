import CDN from "../../src/cdn/cdn";

describe("CDN", () => {
    describe("isCDNEnabled", () => {
        let cdn: CDN;
        beforeAll(() => {
            cdn = new CDN();
        });
        test('Should return true if env is "true"', () => {
            process.env.ENABLE_CDN = "true";
            expect(cdn.isCDNEnabled()).toBe(true);
        });
        test('Should return true if env is "1"', () => {
            process.env.ENABLE_CDN = "1";
            expect(cdn.isCDNEnabled()).toBe(true);
        });
        test('Should return false if env is "false"', () => {
            process.env.ENABLE_CDN = "false";
            expect(cdn.isCDNEnabled()).toBe(false);
        });
        test('Should return false if env is "0"', () => {
            process.env.ENABLE_CDN = "0";
            expect(cdn.isCDNEnabled()).toBe(false);
        });
        test("Should return false if env is undefined", () => {
            delete process.env.ENABLE_CDN;
            expect(cdn.isCDNEnabled()).toBe(false);
        });
    });
    describe("getCDNPath", () => {
        let cdn: CDN;
        beforeAll(() => {
            cdn = new CDN();
        });
        test("Should return value from CDN_PATH", () => {
            const value = "test_path/";
            process.env.CDN_PATH = value;
            expect(cdn.getCDNPath()).toBe(value);
        });
        test("Should return cdn/ if env is undefined", () => {
            delete process.env.CDN_PATH;
            expect(cdn.getCDNPath()).toBe("cdn/");
        });
    });
});

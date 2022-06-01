import CDN from "../../src/cdn/cdn";

describe("CDN", () => {
    describe("isCDNEnabled", () => {
        test('Should return true if env is "true"', () => {
            process.env.ENABLE_CDN = "true";
            expect(CDN.isCDNEnabled).toBe(true);
        });
        test('Should return true if env is "1"', () => {
            process.env.ENABLE_CDN = "1";
            expect(CDN.isCDNEnabled).toBe(true);
        });
        test('Should return false if env is "false"', () => {
            process.env.ENABLE_CDN = "false";
            expect(CDN.isCDNEnabled).toBe(false);
        });
        test('Should return false if env is "0"', () => {
            process.env.ENABLE_CDN = "0";
            expect(CDN.isCDNEnabled).toBe(false);
        });
        test("Should return false if env is undefined", () => {
            delete process.env.ENABLE_CDN;
            expect(CDN.isCDNEnabled).toBe(false);
        });
    });
    describe("getCDNPath", () => {
        let cdn: CDN;
        beforeAll(() => {
            cdn = new CDN({});
        });
        test("Should return value from CDN_PATH", () => {
            const value = "test_path/";
            process.env.CDN_PATH = value;
            expect(cdn.getCDNPath).toBe(value);
        });
        test("Should return cdn/ if env is undefined", () => {
            delete process.env.CDN_PATH;
            expect(cdn.getCDNPath).toBe("cdn/");
        });
    });
});

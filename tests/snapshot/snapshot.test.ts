import Snapshot from "../../src/snapshot/snapshot";

describe("Snapshot", () => {
    describe("isSnapshotEnabled", () => {
        test('Should return true if env is "true"', () => {
            process.env.ENABLE_SNAPSHOT = "true";
            expect(Snapshot.isSnapshotEnabled).toBe(true);
        });
        test('Should return true if env is "1"', () => {
            process.env.ENABLE_SNAPSHOT = "1";
            expect(Snapshot.isSnapshotEnabled).toBe(true);
        });
        test('Should return false if env is "false"', () => {
            process.env.ENABLE_SNAPSHOT = "false";
            expect(Snapshot.isSnapshotEnabled).toBe(false);
        });
        test('Should return false if env is "0"', () => {
            process.env.ENABLE_SNAPSHOT = "0";
            expect(Snapshot.isSnapshotEnabled).toBe(false);
        });
        test("Should return false if env is undefined", () => {
            delete process.env.ENABLE_SNAPSHOT;
            expect(Snapshot.isSnapshotEnabled).toBe(false);
        });
    });
    describe("getSnapshotPath", () => {
        let snapshot: Snapshot;
        beforeAll(() => {
            snapshot = new Snapshot({});
        });
        test("Should return value from CDN_PATH", () => {
            const value = "test_path/";
            process.env.SNAPSHOT_PATH = value;
            expect(snapshot.getSnapshotPath).toBe(value);
        });
        test("Should return snapshot/ if env is undefined", () => {
            delete process.env.SNAPSHOT_PATH;
            expect(snapshot.getSnapshotPath).toBe("snapshot/");
        });
    });
});

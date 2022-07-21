import SnapshotService from "../services/snapshot/snapshotService";

async function rebuildSnapshotCommand() {
    await new SnapshotService({}).rebuild({ verbose: true });
}

export default rebuildSnapshotCommand;

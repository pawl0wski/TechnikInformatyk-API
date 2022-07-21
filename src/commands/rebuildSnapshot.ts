import SnapshotService from "../services/snapshotService/snapshotService";

async function rebuildSnapshotCommand() {
    await new SnapshotService({}).rebuild();
}

export default rebuildSnapshotCommand;

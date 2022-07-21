import SnapshotService from "../services/snapshotService/snapshotService";

async function rebuildSnapshotCommand() {
    await new SnapshotService({}).rebuild({ verbose: true });
}

export default rebuildSnapshotCommand;

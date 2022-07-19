import Snapshot from "../snapshot/snapshot";

async function rebuildSnapshotCommand() {
    await new Snapshot({}).rebuild({ verbose: true });
}

export default rebuildSnapshotCommand;

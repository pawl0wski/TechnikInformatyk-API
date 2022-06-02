import CDN from "../cdn/cdn";

async function rebuildCDNCommand() {
    await new CDN({}).rebuild({ verbose: true });
}

export default rebuildCDNCommand;

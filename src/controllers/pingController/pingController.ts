import { Get, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";

@Route("ping")
@Tags("Other")
export class PingController extends Controller {
    @Get("")
    @Security("api_key", ["client"])
    public async getPing(): Promise<string> {
        return "pong";
    }
}

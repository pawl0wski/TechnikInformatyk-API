import { Get, Route, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";

@Route("ping")
@Tags("Other")
export class PingController extends Controller {
    @Get("")
    public async getPing(): Promise<string> {
        return "pong";
    }
}

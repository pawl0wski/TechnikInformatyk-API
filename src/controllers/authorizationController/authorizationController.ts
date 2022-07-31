import { Get, Path, Route, Security, Tags } from "tsoa";
import { Controller } from "@tsoa/runtime";
import AuthenticationService from "../../services/authenticationService/authenticationService";
import NotFoundError from "../../errors/notFoundError";
import ApiKeyResponse from "../../interfaces/apiKeyResponse";

@Route("key")
@Tags("Authorization")
export class AuthorizationController extends Controller {
    private readonly _authenticationService: AuthenticationService;

    constructor(authenticationService?: AuthenticationService) {
        super();
        if (authenticationService === undefined)
            authenticationService = new AuthenticationService();
        this._authenticationService = authenticationService;
    }

    @Get("{key}")
    @Security("api_key", ["admin"])
    public async getApiKey(@Path("key") key: string): Promise<ApiKeyResponse> {
        const permission = await this._authenticationService.checkKeyPermission(
            key
        );
        if (permission === null)
            throw new NotFoundError("Can't find provided api key");
        return {
            key: key,
            permission: permission,
        };
    }
}

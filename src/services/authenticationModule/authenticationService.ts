import ApiKey from "../../database/models/apiKey.model";

export default class AuthenticationService {
    public async checkKeyPermission(key: string): Promise<string | null> {
        const apiKey = await ApiKey.findOne({
            where: {
                key,
            },
        });
        if (apiKey === null) return null;

        return apiKey.privilege;
    }

    public async checkIfKeyHavePermission(
        key: string,
        permission: string
    ): Promise<boolean> {
        const keyPermission = await this.checkKeyPermission(key);
        return permission === keyPermission;
    }
}

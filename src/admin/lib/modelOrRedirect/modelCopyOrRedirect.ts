import { RouteLocationRaw } from "vue-router";
import router from "../../router/router";
import Model from "../../models/model";

type GetModelFunction = () => Promise<Model | null>;

export default class ModelCopyOrRedirect {
    private readonly _getModel: GetModelFunction;
    private readonly _routeLocation: RouteLocationRaw;

    static redirectToHome(options: {
        getModel: GetModelFunction;
    }): ModelCopyOrRedirect {
        const { getModel } = options;
        return new ModelCopyOrRedirect({
            getModel,
            routeLocation: {
                name: "home",
            },
        });
    }

    constructor(options: {
        getModel: GetModelFunction;
        routeLocation: RouteLocationRaw;
    }) {
        const { getModel, routeLocation } = options;
        this._getModel = getModel;
        this._routeLocation = routeLocation;
    }

    async getOrRedirect(): Promise<Model> {
        const model = await this._getModel();
        if (model === null) {
            await this._redirect();
            throw new Error(`Can't get model.`);
        }
        return model.copy();
    }

    async _redirect() {
        await router.replace(this._routeLocation);
    }
}

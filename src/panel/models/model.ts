export default abstract class Model {
    alreadyInDatabase = false;
    abstract copy(): Model;
    abstract create(): Promise<void>;
    abstract update(): Promise<void>;
    abstract delete(): Promise<void>;
    abstract createOrUpdateIfAlreadyInDatabase(): Promise<void>;
}

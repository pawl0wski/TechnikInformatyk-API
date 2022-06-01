export default abstract class Adapter {
    abstract adapt(): {
        [key: string]: string | boolean | string[] | number;
    }[];
}

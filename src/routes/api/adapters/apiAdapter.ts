export default abstract class ApiAdapter {
    abstract getAsApiObject(): {
        [key: string]: string | boolean | string[] | number;
    }[];
}

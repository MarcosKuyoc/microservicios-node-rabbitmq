export abstract class Bootstrap {
    abstract initilize(): Promise<boolean | Error>
}
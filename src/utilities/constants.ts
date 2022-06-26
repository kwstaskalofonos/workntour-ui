
class System{

    // @ts-ignore
    private _apiUrl:string = __API_URL__;

    getUrl():string{
        return this._apiUrl;
    }
}

export class Constants{

    private static system: System = new System();

    public static getApiUrl():string{
        return this.system.getUrl();
    }
}
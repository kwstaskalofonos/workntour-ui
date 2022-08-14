import {sha256} from 'js-sha256';

export class LocalStorage{

    setItem<T>(name:string,value: T, expirationInMillis:number | undefined = undefined):void{
        const expirationKey = this._expirationKey(name);
        let expirationTimestamp;
        const now: Date = new Date();
        if(expirationInMillis){
            expirationTimestamp = now.getTime() + expirationInMillis;
            localStorage.setItem(expirationKey,JSON.stringify(expirationTimestamp));
        }
        return localStorage.setItem(name,JSON.stringify(value));
    }

    getItem<T>(name:string): T | null{
        const expirationKey = this._expirationKey(name);
        let expirationTimestamp:string | null = localStorage.getItem(expirationKey);
        if(expirationTimestamp != null){
            if(this._hasExpired(name,expirationTimestamp)){
                this.removeItem(name);
                return null;
            }
        }
        let temp = localStorage.getItem(name);
        if(temp === null){
            return temp;
        }
        return <T>JSON.parse(temp);
    }

    update<T>(name:string, value: T, removeExpired:boolean):void{
        const expirationKey = this._expirationKey(name);
        let expirationTimestamp:string | null = localStorage.getItem(expirationKey);
        if(expirationTimestamp != null){
            if(this._hasExpired(name,expirationTimestamp) && removeExpired){
                this.removeItem(name);
                return;
            }
        }
        localStorage.setItem(name,JSON.stringify(value));
    }

    removeItem(name:string){
        return localStorage.removeItem(name);
    }

    _expirationKey(key:string){
        var hash = sha256.create();
        hash.update(key);
        hash.hex();
        let hasPart:string=hash.toString().substring(0,8);
        return '${key}_expires_${hasPart}'
    }

    _hasExpired(key:string, expires:any): boolean{
        if(expires === Infinity){
            return false;
        }
        if(isNaN(expires)){
            return false;
        }
        let now = Date.now();
        return expires < now;
    }
}

export const SessionStorage = new LocalStorage();

export function clearRefData(){
    SessionStorage.removeItem('profile');
}
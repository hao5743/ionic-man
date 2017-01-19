import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

/*
 * 对Storage进行二次封装，增加可维护性, 或方便添加我们自己的钩子代码
 */
@Injectable()
export class Local {
    constructor(public storage: Storage) {
    }

    get(key: string): Promise<any> {
        return this.storage.get(key);
    }

    set(key: string, value: any): any {
        return this.storage.set(key, value);
    }

    remove(key: string): any {
        return this.storage.remove(key);
    }

    clear(): any {
        return this.storage.clear();
    }

    /**
     * @return the number of keys stored.
     */
    length(): any {
        return this.storage.length();
    }

    /**
     * @return the keys in the store.
     */
    keys(): any {
        return this.storage.keys();
    }

    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     */
    forEach(iteratorCallback: (value: any, key: string, iterationNumber: Number) => any): any {
        this.storage.forEach(iteratorCallback);
    }

}

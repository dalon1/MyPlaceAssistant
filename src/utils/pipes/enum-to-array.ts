import { Pipe } from '@angular/core';

@Pipe({
    name: 'enumToArray'
})
export class EnumToArray  {
    transform(data: Object) {
        var keys = Object.keys(data);
        return keys;
    }
    constructor() {}
}
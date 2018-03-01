import { Pipe } from '@angular/core';

@Pipe({
    name: 'maskRefNumber'
})
export class MaskRefNumber  {
    transform(data: string) {
        return data.slice(data.length - 10, data.length -1);;
    }
    constructor() {}
}
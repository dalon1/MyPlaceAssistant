import { Pipe } from '@angular/core';

@Pipe({
    name: 'maskCardNumber'
})
export class MaskCardNumber  {
    transform(data: string) {
        return '**** ' + data.slice(data.length - 5, data.length -1);;
    }
    constructor() {}
}
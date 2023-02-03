import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item[Object.keys(filter)[0]].indexOf(Object.values(filter)[0]) !== -1);
        //console.log('items',items);
        //console.log('filter',filter);
        //return items;
    }
}

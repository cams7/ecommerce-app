import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productShortName'
})
export class ProductShortNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const LENGTH: number = 20;

    if(value.length <= LENGTH)
      return value;

    return value.substring(0, LENGTH) + '...';
  }

}

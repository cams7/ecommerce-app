import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productShortDescription'
})
export class ProductShortDescriptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const LENGTH: number = 147;

    if(value.length <= LENGTH)
      return value;

    return value.substring(0, LENGTH) + '...';
  }

}

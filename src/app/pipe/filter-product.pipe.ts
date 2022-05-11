import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProductPipe'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: any[], filterTexT:string): any[] {
    return value.filter(p=> p.name.toLowerCase().indexOf(filterTexT.toLowerCase())!==-1);
  }

}

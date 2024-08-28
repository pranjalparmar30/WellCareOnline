import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchText: any): any[] {
    if (!data || !searchText) {
      return data;
    }
    const searchTextLower = searchText.toLowerCase();

    return data.filter(row => {
      return Object.values(row).some(value => {
        if (value !== null && value !== undefined) {
          const valueAsString = String(value).toLowerCase();
          return valueAsString === searchTextLower || valueAsString.startsWith(searchTextLower);
        }
        return false;
      });
    });
  }
}

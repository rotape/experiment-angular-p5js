import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
  pure: false,
})
export class ReversePipe implements PipeTransform {
  transform(items: []): any {
    return items ? items.slice().reverse() : items;
  }
}

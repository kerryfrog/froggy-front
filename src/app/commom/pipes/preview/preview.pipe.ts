import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "preview",
})
export class PreviewPipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 20,
    type: string = "none"
  ): string {
    if (value.length >= maxLength) {
      if (type === "none") {
        const short = value.substring(0, maxLength);
        return short;
      }
      const short = value.substring(0, maxLength) + "...";
      return short;
    } else {
      return value;
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewPipe } from '../preview.pipe';

@NgModule({
  declarations: [
    PreviewPipe,
  ],
  imports: [CommonModule],
  exports: [
    PreviewPipe,
  ],
})

export class ApplicationPipesModule { }
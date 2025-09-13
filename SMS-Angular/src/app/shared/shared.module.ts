import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './Components/grid/grid.component';
import { FormComponent } from './Components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    GridComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    GridComponent,
    FormComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }

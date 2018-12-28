import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatDividerModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatButtonModule,
  MatCardModule,
  MatSliderModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatProgressSpinnerModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatDividerModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}

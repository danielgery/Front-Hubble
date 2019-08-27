import { NgModule } from "@angular/core";
import {MatButtonModule, MatCheckboxModule, MatTabsModule, MatStepperModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule} from '@angular/material'

@NgModule({
    imports:
    [
      MatButtonModule,
      MatCheckboxModule,
      MatTabsModule,
      MatStepperModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule
    ],
    exports:
    [
      MatButtonModule,
      MatCheckboxModule,
      MatTabsModule,
      MatStepperModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule
    ]
})

export class MaterialImportsModule {}

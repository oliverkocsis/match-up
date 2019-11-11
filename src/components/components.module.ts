import { NgModule } from '@angular/core';
import { CardComponent } from './card/card';
import { IonicModule } from 'ionic-angular';
import { BoardComponent } from './board/board';
import { LevelsComponent } from './levels/levels';
import { ThemesComponent } from './themes/themes';
import { PurchaseComponent } from './purchase/purchase';

@NgModule({
    declarations: [
        CardComponent,
        BoardComponent,
        LevelsComponent,
        ThemesComponent,
        PurchaseComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CardComponent,
        BoardComponent,
        LevelsComponent,
        ThemesComponent,
        PurchaseComponent
    ]
})
export class ComponentsModule { }

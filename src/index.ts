import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import TabbyCoreModule, {ConfigProvider} from 'tabby-core'
import { SettingsTabProvider } from 'tabby-settings'

import { HelperSettingsTabProvider } from './settingsTabProvider'
import { HelperSettingsTabComponent } from './settingsTab.component'
import {EditConnModalComponent} from './editConnModal.component'
import { JumpHelperConfigProvider } from './config'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabbyCoreModule,
    ],
    providers: [
        { provide: ConfigProvider, useClass: JumpHelperConfigProvider, multi: true },
        { provide: SettingsTabProvider, useClass: HelperSettingsTabProvider, multi: true },
    ],
    entryComponents: [
        HelperSettingsTabComponent,
        EditConnModalComponent,
    ],
    declarations: [
        HelperSettingsTabComponent,
        EditConnModalComponent,
    ],
})
export default class HelperModule { }

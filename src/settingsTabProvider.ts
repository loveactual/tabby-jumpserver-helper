import { Injectable } from '@angular/core'
import { SettingsTabProvider } from 'tabby-settings'

import { HelperSettingsTabComponent } from './settingsTab.component'

/** @hidden */
@Injectable()
export class HelperSettingsTabProvider extends SettingsTabProvider {
    id = 'jumphelper'
    title = 'JUMP HELPER'

    getComponentType (): any {
        return HelperSettingsTabComponent
    }
}

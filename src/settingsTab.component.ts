import { Component } from '@angular/core'
import { QuickConn } from './api'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import {ConfigService, ProfilesService} from 'tabby-core'
import { EditConnModalComponent } from './editConnModal.component'
import { PlatformService } from 'tabby-core'
import deepClone from 'clone-deep'


/** @hidden */
@Component({
    template: require('./settingsTab.component.pug'),
    styles: [require('./settingsTab.component.scss')],
})
export class HelperSettingsTabComponent { 
    
    qcs: QuickConn[]

    constructor (
        public config: ConfigService,
        private ngbModal: NgbModal,
        private platform: PlatformService,
        private profilesService: ProfilesService,
    ) {
        this.qcs = this.config.store.qcs
    }

    async createQc () {
        const qc: QuickConn = {
            name: '',
            sshTabName: '',
            labels: '',
        }

        const modal = this.ngbModal.open(EditConnModalComponent)
        modal.componentInstance.qc = qc
        const result = await modal.result.catch(() => null)
        if (!result) {
            return null
        }
        await this.config.store.qcs.push(result)
        await this.config.save()
    }

    async editQc (qc: QuickConn) {
        const modal = this.ngbModal.open(EditConnModalComponent)
        modal.componentInstance.qc = Object.assign({}, qc)
        const result = await modal.result.catch(() => null)
        if (!result) {
            return null
        }
        await Object.assign(qc, result)
        await this.config.save()
    }

    async deleteQc (qc: QuickConn) {
        if ((await this.platform.showMessageBox(
            {
                type: 'warning',
                message: `Delete "${qc.name}"?`,
                buttons: [
                    '删除',
                    '保留',
                ],
                defaultId: 1,
                cancelId: 1,
            },
        )).response === 0) {
            this.config.store.qcs = this.config.store.qcs.filter(x => x !== qc)
            this.qcs = this.config.store.qcs
            await this.config.save()
        }
    }

    async launchQc (qc: QuickConn){
        let profiles = await this.profilesService.getProfiles()
        profiles = profiles.filter(x => x.name === qc.sshTabName)
        console.log(profiles)
        if(profiles.length === 0){
            await this.platform.showMessageBox({
                type: 'warning',
                message: '堡垒机不存在',
                buttons: [
                    '确认'
                ],
                defaultId: 1,
                cancelId: 1,
            },)
            return
        }

        let profile = profiles[0];
        if(profile.type !== 'ssh'){
            await this.platform.showMessageBox({
                type: 'warning',
                message: '配置类型不是SSh，无法连接',
                buttons: [
                    '确认'
                ],
                defaultId: 1,
                cancelId: 1,
            },)
            return
        }

        for(let label of qc.labels.split('\n')){
            let scripts = [];
            scripts.push({"expect":"Opt>", "send": label + '\r'})
            const p = deepClone(profile)
            p.options.scripts = scripts
            await this.profilesService.openNewTabForProfile(p)
        }
    }

}

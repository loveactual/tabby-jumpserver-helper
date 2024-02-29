import { Component } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { QuickConn } from './api'

@Component({
    template: require('./editConnModal.component.pug'),
})
export class EditConnModalComponent {
    qc: QuickConn

    constructor (
        private modalInstance: NgbActiveModal,
    ) {
    }

    save () {
        this.modalInstance.close(this.qc)
    }

    cancel () {
        this.modalInstance.dismiss('用户关闭')
    }
}

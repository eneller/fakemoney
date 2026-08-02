import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  imports: [NgTemplateOutlet],
  templateUrl: './modal.html',
  styleUrl: './modal.less',
})
export class Modal {
  @Input({required: true}) title!: string;
  @Input({required: true}) body!: TemplateRef<any>;
  
  constructor(
    public activeModal: NgbActiveModal
  ){}
  
}

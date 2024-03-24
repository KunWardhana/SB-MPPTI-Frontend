import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() width: string = '720px';
  @Input() isDismiss: boolean = true;

  @Output() modalData = new EventEmitter();

  constructor(private readonly el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  closeModal() {
    this.isVisible = false;
    this.modalData.emit({ visible: this.isVisible });
  }
}

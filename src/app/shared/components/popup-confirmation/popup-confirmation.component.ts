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
  selector: 'app-popup-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-confirmation.component.html',
  styleUrls: [],
})
export class PopupConfirmationComponent implements OnInit {
  @Input() isVisible: boolean = false;
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

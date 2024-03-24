import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NUMBER } from '@app/core/constants/general.constant';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './add-article.component.html',
  styles: [],
})
export class AddArticleComponent implements OnInit {
  //path
  pathMonitoring: string;
  url: string;
  isAdd: boolean = false;
  isDetail: boolean = false;
  isReview: boolean = false;
  popupSuccess: any;
  popupFail: any;
  title: string = '';
  loginDetail: any = JSON.parse(localStorage.getItem('loginDetail')!);
  state: any;

  //detail
  detailData: any;

  //modal
  isVisible = false;
  modalData: any;
  id: string = '';

  // Form
  articleForm: FormGroup;
  acceptExtensionFile = ['.png', '.jpg', '.jpeg'];
  maxFileSize = 2;
  minFileSize = 0.01;
  imageBase64: string[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state ?? '';

    this.articleForm = this.fb.group({
      title: ['', [Validators.required]],
      images: [''],
      articleBody: ['', [Validators.required]],
    });

    //check path
    this.pathMonitoring = this.router.url.split('/')[NUMBER.THREE];
    //url
    this.url = this.router.url.split('/').slice(0, NUMBER.THREE).join('/');
    //check path & state
  }

  ngOnInit(): void {
    this.checkPath();
  }

  checkPath() {
    if (this.pathMonitoring === 'add-article') {
      this.isAdd = true;
      this.title = 'Add Article';
      this.popupSuccess = {
        icon: 'assets/icons/check_circle.svg',
        message: 'Pembuatan Artikel Berhasil',
        title: 'Artikel yang anda buat berhasil tersimpan.',
      };
      return true;
    } else {
      if (!this.state && !this.state.id) {
        this.router.navigateByUrl(this.url + '/list-article');
        return false;
      }

      this.fetchDetail();

      if (this.pathMonitoring === 'edit-article') {
        this.isDetail = true;
        this.title = 'Edit Article';
        this.popupSuccess = {
          icon: 'assets/icons/check_circle.svg',
          message: 'Ubah Artikel Berhasil',
          title: 'Artikel yang anda ubah berhasil tersimpan.',
        };
        return true;
      } else {
        this.isReview = true;
        this.title = 'Review Article';
        this.articleForm.disable();

        this.popupSuccess = {
          icon: 'assets/icons/check_circle.svg',
          message: 'Artikel Berhasil Disetujui',
          title: 'Artikel yang anda setujui berhasil tersimpan.',
        };
        this.popupFail = {
          icon: 'assets/icons/check_circle.svg',
          message: 'Artikel Berhasil Ditolak',
          title: 'Artikel yang anda tolak berhasil tersimpan.',
        };
        return true;
      }
    }
  }

  fetchDetail() {}

  onClickSubmit() {}

  onClickCancel() {
    const url = this.router.url.split('/').slice(0, 3).join('/');
    this.router.navigateByUrl(url + '/list-article');
  }

  onClickModalClose(event: any) {
    this.isVisible = event.visible;
  }

  onClickModalConfirm(type: string) {
    if (type === 'delete') {
      this.onClickDeleteConfirm();
    } else {
      this.onClickReviewConfirm(type);
    }
  }

  onClickDelete() {
    this.isVisible = true;

    this.modalData = {
      title: 'Hapus Artikel',
      desc: 'Apakah Anda yakin akan menghapus draft?',
      type: 'delete',
    };
  }

  onClickDeleteConfirm() {}

  onClickReview(type: string) {
    this.isVisible = true;
    if (type === 'reject') {
      this.modalData = {
        title: 'Tolak Artikel',
        desc: 'Apakah Anda yakin akan tolak draft?',
        type: 'reject',
      };
    } else {
      this.modalData = {
        title: 'Setujui Artikel',
        desc: 'Apakah Anda yakin akan setujui draft?',
        type: 'approve',
      };
    }
  }

  onClickReviewConfirm(type: string) {}
}

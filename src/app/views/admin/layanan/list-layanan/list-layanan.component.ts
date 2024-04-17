import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NUMBER } from '@app/core/constants/general.constant';
import { ModalComponent } from '@app/shared/components/modal/modal.component';

@Component({
  selector: 'app-list-layanan',
  templateUrl: './list-layanan.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class ListLayananComponent implements OnInit {
  // articleID
  articleId: string = '';

  // form search
  searchForm: FormGroup;
  typingSearch: any;

  // Modal
  isVisible = false;
  modalData: any;

  // Pagination Props
  pageSize = 10;
  pageSizeArray = [5, 10, 15, 20];
  pageSizeDropdown = false;

  pageArray: number[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentIndex = 0;
  currentPage: number = 0;
  showPage = 3;

  startItem: number = 0;
  endItem: number = 0;
  startPage: number = 0;
  endPage: number = 0;

  // Table Props
  tableHeaderArray = ['Title', 'Action'];
  tableDataArray: any[] = [];
  tableDataSource: any[] = [];

  // Sort
  sort = 'DESC';
  sortBy = 'createdDate';
  isStatusSort = false;
  isTitleSort = false;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      textSearch: '',
    });
  }

  ngOnInit(): void {
    this.fetchTableData();
  }

  fetchTableData() {}

  doFilterSearch(dataParams: any, textSearch?: any) {
    const paramsObj: any = {
      fromObject: {
        limit: dataParams.limit,
        start: dataParams.start,
        sort: dataParams.sort,
        sortBy: dataParams.sortBy,
      },
    };

    if (textSearch) {
      paramsObj.fromObject['textSearch'] = textSearch;
    }

    return {
      params: new HttpParams({ fromObject: { ...paramsObj.fromObject } }),
    };
  }

  onClickDetail(id: string, type: string) {
    const extras: NavigationExtras = {
      state: {
        id,
      },
    };
    const url = this.router.url.split('/').slice(0, NUMBER.THREE).join('/');
    if (type === 'edit') {
      this.router.navigateByUrl(url + '/edit-article', extras);
    } else {
      this.router.navigateByUrl(url + '/review-article', extras);
    }
  }

  onClickDelete(id: string, type: string) {
    this.isVisible = true;
    this.articleId = id;

    if (type === 'delete') {
      this.modalData = {
        title: 'Hapus Artikel',
        desc: 'Apakah Anda yakin akan menghapus draft?',
      };
    }
  }

  onClickModalClose(event: any) {
    this.isVisible = event.visible;
  }

  onClickDeleteConfirm() {}

  onKeyupSearch(e: any) {
    const dataParams = {
      limit: this.pageSize,
      start: NUMBER.ZERO,
      sort: 'DESC',
      sortBy: 'createdDate',
    };

    clearTimeout(this.typingSearch);
    this.typingSearch = setTimeout(() => {}, NUMBER.ONE_THOUSAND);
  }

  doPaginate() {
    // ensure total items greater than zero
    if (this.totalItems > 0) {
      this.doCalculateTotalPages();
      this.doCalculateCurrentPage();
      this.doCalculatePage();
      this.doCalculateItem();
      this.doCreatePageArray();
    } else {
      throw new Error('totalItems less than or equals to zero');
    }
  }

  doCalculateTotalPages() {
    // calculate total pages
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  doCalculateCurrentPage() {
    // calculate current page
    this.currentPage = this.currentIndex + 1;

    // ensure current page isn't out of range
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
      this.currentIndex = this.totalPages - 1;
    }
  }

  doCalculatePage() {
    if (this.totalPages <= this.showPage) {
      // total pages less than max so show all pages
      this.startPage = 1;
      this.endPage = this.totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(this.showPage / 2);
      const maxPagesAfterCurrentPage = Math.ceil(this.showPage / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        this.startPage = 1;
        this.endPage = this.showPage;
      } else if (
        this.currentPage + maxPagesAfterCurrentPage >=
        this.totalPages
      ) {
        // current page near the end
        this.startPage = this.totalPages - this.showPage + 1;
        this.endPage = this.totalPages;
      } else {
        // current page somewhere in the middle
        this.startPage = this.currentPage - maxPagesBeforeCurrentPage;
        this.endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }
  }

  doCalculateItem() {
    // calculate start and end item indexes
    this.startItem = this.currentPage * this.pageSize - this.pageSize + 1;
    this.endItem = this.currentPage * this.pageSize;
  }

  doCreatePageArray() {
    // create an array of pages to ng-repeat in the pager control
    this.pageArray = Array.from(
      Array(this.endPage + 1 - this.startPage).keys()
    ).map((i) => this.startPage + i);
  }

  hasPreviousPage(): boolean {
    // ensure page has previous page
    return this.currentIndex >= 1;
  }

  hasNextPage(): boolean {
    // ensure page has next page
    return this.currentIndex < this.totalPages - 1;
  }

  clickPreviousPage() {
    //go to previous page
    if (this.hasPreviousPage()) {
      this.currentIndex = this.currentIndex - 1;
      this.fetchTableData();
    }
  }

  clickNextPage() {
    // go to next page
    if (this.hasNextPage()) {
      this.currentIndex = this.currentIndex + 1;
      this.fetchTableData();
    }
  }

  clickNumberButton(value: number) {
    // click event when page button clicked
    this.currentIndex = value - 1;
    this.fetchTableData();
  }

  clickPageSizeDropdown(val: number) {
    // click event when page size dropdown clicked
    this.pageSizeDropdown = false;
    this.pageSize = val;
    this.currentIndex = 0;
    this.fetchTableData();
  }

  clickAddArticle() {
    const url = this.router.url.split('/').slice(0, 3).join('/');
    console.log(url + '/add');
    this.router.navigateByUrl(url + '/add');
  }

  handleSort(type: string) {
    if (type === 'Status') {
      this.isStatusSort = !this.isStatusSort;
      this.isTitleSort = false;
      if (this.isStatusSort) {
        this.sortBy = 'status';
        this.sort = 'ASC';
      } else {
        this.sortBy = 'createdDate';
        this.sort = 'DESC';
      }
    } else {
      this.isTitleSort = !this.isTitleSort;
      this.isStatusSort = false;
      if (this.isTitleSort) {
        this.sortBy = 'title';
        this.sort = 'ASC';
      } else {
        this.sortBy = 'createdDate';
        this.sort = 'DESC';
      }
    }

    this.fetchTableData();
  }
}

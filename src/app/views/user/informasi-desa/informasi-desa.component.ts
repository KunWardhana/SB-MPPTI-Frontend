import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { AlbumComponent } from '@app/shared/components/album/album.component';
import { CarousellComponent } from '@app/shared/components/carousell/carousell.component';

@Component({
  selector: 'app-informasi-desa-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    AlbumComponent,
    CarousellComponent,
  ],
  templateUrl: './informasi-desa.component.html',
  styleUrls: ['./informasi-desa.component.scss'],
})
export class InformasiDesaPageComponent implements OnInit {
  linkHover = false;

  constructor(private readonly metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({
      name: 'description',
      content: "Desa Manud Jaya's Landing Page",
    });
  }
}

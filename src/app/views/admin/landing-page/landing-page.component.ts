import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  linkHover = false;

  constructor(private readonly metaService: Meta) {}

  ngOnInit(): void {
    this.metaService.updateTag({
      name: 'description',
      content: "Desa Manud Jaya's Landing Page",
    });
  }
}

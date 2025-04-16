import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languagesList: Languages[] = [];

  constructor(private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languagesService.getLanguages().subscribe(data => {
      this.languagesList = data;
      console.log(this.languagesList);
    });
  }
}

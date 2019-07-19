import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"]
})
export class DialogComponent implements OnInit {
  itens: any[];
  isFilm: boolean
  isPerson: boolean
  namesPersons: any[]
  namesFilms: any[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.itens = this.data.instancia.objectsReturned.results;
    this.isFilm = this.data.isFilm
    this.isPerson = this.data.isPerson
    this.namesFilms = this.data.namesFilms
    this.namesPersons = this.data.namesPersons
    console.log(this.data.namesFilms)
  }
}

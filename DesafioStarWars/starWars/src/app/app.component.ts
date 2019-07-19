import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AppService } from "./app.service";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { DialogComponent } from "./app/dialog/dialog.component";
import { TypeScriptEmitter } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;

  /*title = 'starWars';*/
  objectsReturned: any = [];
  isFilm: boolean = false
  isPerson: boolean = false
  namesFilms: any[] = []
  namesPersons: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private service: AppService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      personagemFilme: ["", Validators.required],
      selecionePersonagemFilme: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("iniciou");
  }


  getPersonsByFilms(param: number) {
    this.service.getPersonsByFilms(param).subscribe(response => {
      return response
    });
  }

  getFilmsByPerson(param: number) {
    this.service.getFilmsByPerson(param).subscribe(response => {
      return response
    })
  }

  getData() {
    let paramSearch = this.formGroup.get("personagemFilme").value;
    let typeParam = this.formGroup.get("selecionePersonagemFilme").value;
    let formIsValid = false;

    if (paramSearch == "" || typeParam == "") {
      this.snackBar.open('Preencha todos os parâmetros de pesquisa', '', { duration: 5000 })
    }

    else {
      formIsValid = true
    }

    if (formIsValid == true) {
      if (typeParam === "Personagem") {

        this.isPerson = true
        this.isFilm = false
        let noPersonsFound = true
        this.service.getPersons(paramSearch).subscribe(response => {

          this.objectsReturned = response;
          if (this.objectsReturned.count == 0)
            this.snackBar.open('Nenhum personagem encontrado', '', { duration: 5000 })
          else
            noPersonsFound = false

          if (!noPersonsFound) {
            this.openDialog();

            for (let index = 1; index <= 3; index++) {
              let response = this.getFilmsByPerson(index);

            }

            for (let index = 0; index < this.objectsReturned['results'][0]['films'].length; index++) {
              this.service.getFilmsNames(this.objectsReturned['results'][0].films[index]).subscribe(returneds => {
                this.namesFilms.push(returneds)

              })
            }
          }
        }),
          error => {
            console.log("ERRO");
          };
      }

      else {
        this.isFilm = true
        this.isPerson = false
        let noFilmsFound = true
        this.service.getFilms(paramSearch).subscribe(response => {

          this.objectsReturned = response;
          if (this.objectsReturned.count == 0) {
            this.snackBar.open("Nenhum filme encontrado", '', { duration: 5000 })
          }
          else {
            noFilmsFound = false
          }

          if (!noFilmsFound) {

            this.openDialog();

            for (let index = 1; index <= 3; index++) {
              this.getPersonsByFilms(index);
            }

            for (let index = 0; index < this.objectsReturned['results'][0]['characters'].length; index++) {

              this.service.getPersonNames(this.objectsReturned['results'][0].characters[index]).subscribe(returneds => {
                this.namesPersons.push(returneds)
              })
              console.log(this.namesPersons);

            }
          }
        }),
          error => {
            console.log("ERRO");
          };
      }
    }
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();

    dialogConfig.width = "70rem";
    dialogConfig.height = "90rem";
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      instancia: this,
      isFilm: this.isFilm,
      isPerson: this.isPerson,
      namesFilms: this.namesFilms,
      namesPersons: this.namesPersons
    };

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  }
}

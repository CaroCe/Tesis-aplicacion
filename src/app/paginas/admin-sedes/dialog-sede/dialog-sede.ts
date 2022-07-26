import { Component, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-sede',
    templateUrl: 'dialog-sede.html',
    styleUrls: ['dialog-sede.css']
  })
  export class DialogSede {
    constructor(
      public dialogRef: MatDialogRef<DialogSede>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private formBuilder: FormBuilder) {

    }
    onSubmit(data: any) {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
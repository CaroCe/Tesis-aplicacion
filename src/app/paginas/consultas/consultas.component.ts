import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, pairwise, Subscription, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements AfterViewInit, OnDestroy {
  @Input() width = 520;
  @Input() height = 450;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  cx!: CanvasRenderingContext2D;
  drawingSubscription!: Subscription;
  outlineImage = new Image();
  displayedColumns: string[] = ['fase', 'fechaInicio','id'];
  displayedColumnsEvolucion: string[] = ['fecha', 'descripcion','id'];
  dataSource = [{
    id:1,
    fase:"Fase 1",
    fechaInicio:"2022-04-15"
  },
  {
    id:2,
    fase:"Fase 2",
    fechaInicio:"2022-04-22"
  },
  {
    id:3,
    fase:"Fase 3",
    fechaInicio:"2022-05-01"
  }

];
dataSourceEvolucion =[
  {
    id:1,
    fecha:"2022-05-06",
    descripcion:"Descripción de la evolución de la dolencia"
  }
]
  constructor(private _formBuilder: FormBuilder,private dialog:MatDialog) { }

  agregarEvolucion(){
    const dialogRef = this.dialog.open(DialogEvolucion, {
      width: '400px',
      height: '550px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d')!;
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.outlineImage.src = '/assets/cuerpo-humano.png';
    this.outlineImage.height = 450;
    this.outlineImage.width = 520;
    setTimeout(() => {
      this.cx.drawImage(this.outlineImage,0, 0);
    }, 500);
    this.cx.lineWidth = 11;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#FF0000';
    this.captureEvents(canvasEl);
  }
  captureEvents(canvasEl: HTMLCanvasElement) {
    this.drawingSubscription = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          return fromEvent(canvasEl, 'mousemove').pipe(
            takeUntil(fromEvent(canvasEl, 'mouseup')),
             takeUntil(fromEvent(canvasEl, 'mouseleave')),
            pairwise()
          );
        })
      )
      .subscribe((res: any) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };
        
        this.drawOnCanvas(prevPos, currentPos);
      });
      
  }

  borrarTodo(){
    this.cx.clearRect(0, 0, 520, 450);
    this.cx.drawImage(this.outlineImage,0, 0);
  }

  drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);

      this.cx.stroke();
    }
  }
  agregarFase(){
    const dialogRef = this.dialog.open(DialogTratamiento, {
      width: '1400px',
      height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  ngOnDestroy() {
    this.drawingSubscription.unsubscribe();
  }
  uploadFile() {  
    let formData = new FormData();  
    formData.append('imagen', this.fileInput.nativeElement.files[0])  
    this.fileInput.nativeElement.value = '';
  }

}
@Component({
  selector: 'dialog-tratamiento',
  templateUrl: 'dialog-tratamiento.html',
  styleUrls: ['dialog-tratamiento.css']
})
export class DialogTratamiento {
  mensaje:string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogTratamiento>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog:MatDialog) {
  }
  onSubmit(data: any) {
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogEjercicio, {
      width: '450px',
      height: '550px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
     
    }); 
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-ejercicio',
  templateUrl: 'dialog-ejercicio.html',
  styleUrls: ['dialog-ejercicio.css']
})
export class DialogEjercicio{
  constructor(
    public dialogRef: MatDialogRef<DialogEjercicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
  }
  onSubmit(data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-evolucion',
  templateUrl: 'dialog-evolucion.html',
  styleUrls: ['dialog-evolucion.css']
})
export class DialogEvolucion{
  
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<DialogEvolucion>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
  }
  onSubmit(data: any) {
  }
  uploadFile() {  
    let formData = new FormData();  
    formData.append('imagen', this.fileInput.nativeElement.files[0])  
    this.fileInput.nativeElement.value = '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

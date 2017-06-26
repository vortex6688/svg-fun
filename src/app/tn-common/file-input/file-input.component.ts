import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
  public file: File = null;

  public fileUpdate($event: MSInputMethodContext) {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    const files: FileList = target.files;
    this.file = files[0];
  }

}

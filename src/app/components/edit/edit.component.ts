import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService],
})
export class EditComponent implements OnInit {
  public title: string;
  public projectDTO: Project;
  public savedProjectDTO: Project;
  public status: string;
  public fileToUpload: Array<File>;
  public error_res = '';
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar proyecto';
    this.projectDTO = new Project('', '', '', '', 2021, '', '');
    this.savedProjectDTO = new Project('', '', '', '', 2021, '', '');
    this.status = '';
    this.fileToUpload = new Array<File>();
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    });
  }
  onSubmit(form: any) {
    this._projectService.updateProject(this.projectDTO).subscribe(
      (response) => {
        console.log(response);
        if (response.projectLista) {
          console.log("Entra en la edicion");
          console.log(response.projectLista);
          this.savedProjectDTO = response.projectLista;

          this.status = 'success';
        } else this.status = 'failed';
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      (response) => {
        if (response.projectLista) {
          this.projectDTO = response.projectLista;
        }
      },
      (error) => {
        this.error_res = error.message;
        console.log('Error al consultar el proyecto.' + this.error_res);
        console.log(error);
      }
    );
  }
}

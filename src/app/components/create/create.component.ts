import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ProjectService,UploadService]
})
export class CreateComponent implements OnInit {
  public title:string;
  public projectDTO:Project;
  public savedProjectDTO:Project;
  public status: string;
  public fileToUpload: Array<File>;
  public url: string;


  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
    ) {
    this.title="Crear nuevo proyecto";
    this.projectDTO= new Project('','','','',2021,'','');
    this.savedProjectDTO= new Project('','','','',2021,'','');
    this.status="";
    this.fileToUpload=new Array<File>();
    this.url = Global.url;

   }

  ngOnInit(): void {
  }

  fileChangeEvent(fileInput:any){
    this.fileToUpload=<Array <File>>fileInput.target.files;
  }

  onSubmit(form: any){
    this._projectService.saveProject(this.projectDTO).subscribe(
      response=>{
        if(response.project){

        /*Subir la imagen
          this._uploadService.makeFileRequest(
            Global.url+"upload-image/"+response.project._id,[],this.fileToUpload,"image").then((result:any)=>{
            console.log(result);
          })*/
          this.savedProjectDTO=response.project;

          this.status="success";
          form.reset();


        }
        else this.status="failed";

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}

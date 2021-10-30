import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService],
})
export class DetailComponent implements OnInit {
  public projectoDTO: Project;
  public url: string;
  public error_res="";
  public confirm:boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.projectoDTO = new Project('', '', '', '', 2021, '', '');
    this.url = Global.url;
    this.confirm=false;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id: any) {
    this._projectService.getProject(id).subscribe(
      (response) => {
        if (response.projectLista) {
          this.projectoDTO = response.projectLista;
        }
      },
      (error) => {
        this.error_res=error.message;
        console.log("Error al consultar el proyecto."+this.error_res);
        console.log(error);
      }
    );
  }
  deleteProject(id: any) {
    this._projectService.deleteProject(id).subscribe(
      (response) => {
        if (response.projectLista) {
          this._router.navigate(['/proyectos']);
        }
      },
      (error) => {
        this.error_res=error.message;
        console.log("Error al eliminar el proyecto."+this.error_res);
        console.log(error);
      }
    );
  }
}

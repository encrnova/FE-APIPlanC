import { Component } from '@angular/core';
import { Autenticacion } from './seguridad/autenticacion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'ApiPlanC';

  constructor(
    private auth: Autenticacion) {
  }

  ngOnInit(): void {
    this.auth.autenticacion();
  }

}

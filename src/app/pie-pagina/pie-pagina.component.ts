import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.css']
})
export class PiePaginaComponent implements OnInit {

  anno: number;

  constructor() { 
    this.anno = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}

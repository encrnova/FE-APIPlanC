import { Injectable } from "@angular/core";
import { UsuarioAuth } from "../modelos/usuario-auth.model";
import { UsuarioAuthService } from "../servicios/usuario-auth.service";

@Injectable({
    providedIn: 'root'
})

export class Autenticacion {

    constructor(
        private usuarioAuthService: UsuarioAuthService,
        private usuarioAuth: UsuarioAuth) {
    }

    ngOnInit(): void {
        this.usuarioAuth = new UsuarioAuth;
    }

    async autenticacion() {
        this.usuarioAuth.UserName = "apiplanc";
        this.usuarioAuth.Password = "123456"

        this.usuarioAuthService.autenticar(this.usuarioAuth)
            .subscribe((res: any) => {
                console.log('token');
                localStorage.setItem('token', res);
            },
                error => {
                    console.log('Se produjo un error mientras se intentaba autenticar.' + error);
                });
    }
}
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/entity/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    /*
      Na ovaj nacin dobavljamo podatke koji su poslati kao parametar u Role dekorator
      potrebno je navesti ROLES_KEY jer preko njega u dekoraturu dobijamo parametre
      potrebno je navesti metod i klasu na kojoj se dekorator nalazi, to radimo pomocu getHandler() i getClass() funkcija
    */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]
    );

    if (!requiredRoles) {
      return true;
    }

    /*
      Iz request objekta dobavljamo naseg usera
      JWTGuard je u request umetnuo usera nakon sto ga je izvukao iz requesta
      (ako se ne secas podseti se kako je odradjen login)
    */
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log("Da li je user: " + user.firstName + ", sa rolom: " + user.role + " kompatibilan sa nekom od rola: " + requiredRoles);

    /*
     Array.some(func) funkcija vraca true ako bar za jedan element niza funkcija func vrati true
    */
    return requiredRoles.some(role=> role===user.role);

    
  }
}

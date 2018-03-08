import { ValidatorFn, AbstractControl, Validators } from "@angular/forms";

import * as _ from 'lodash';


export class AmValidaors {

    static invalidCpf(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            let errors = {
                required: false,
                invalid: false
            };
            if(!control.value) errors.required = true;
            let cpf = control.value ? control.value.toString().replace(/[^\d]+/g,'') : "";
            if(!AmValidaors.isCpfValid(cpf)) errors.invalid = true;
            return Object.keys(_.filter(errors, error => error == true)).length > 0 ? errors : null;
        };
    }
    
    static isCpfValid(cpf) {
        if(cpf == '') return false; 
        // Elimina CPFs invalidos conhecidos    
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
            return false;       
        // Valida 1o digito 
        var add = 0;    
        for (var i=0; i < 9; i ++) {
            add += parseInt(cpf.charAt(i)) * (10 - i); 
        } 
        var rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;
        // Valida 2o digito 
        add = 0;    
        for (var i = 0; i < 10; i ++) { 
            add += parseInt(cpf.charAt(i)) * (11 - i);  
        }
        var rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11) 
            rev = 0;    
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        return true;  
    }

    static invalidPassword(required: boolean, minLength: number): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if(!required && control.value.length == 0) return null;
            let errors = {
                required: false,
                minLength: false
            };
            if(!control.value) errors.required = true;
            if(control.value.length < minLength) errors.minLength = true;
            return Object.keys(_.filter(errors, error => error == true)).length > 0 ? errors : null;
        };
    }

    static invalidEmail(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if(control.value.length == 0) return null;
            return Validators.email(control);
        };
    }

}
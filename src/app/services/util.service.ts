import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UtilService {

  constructor() { }

  encryptFormWithPassword(senha: AbstractControl, password: AbstractControl) {
    var toHash = senha.value;
    senha.setValue('');
    senha.updateValueAndValidity();
    if(toHash.length == 0) return false;
    
    password.setValue(CryptoJS.SHA256(toHash).toString());
    return true;
  }

}

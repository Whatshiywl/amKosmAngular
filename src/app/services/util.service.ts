import { Injectable } from '@angular/core';

import * as $ from 'jquery';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UtilService {

  constructor() { }

  encryptFormWithPassword(senhaID = 'senha', passwordID = 'password') {
    var senha = $(`#${senhaID}`);
    var toHash = senha.val();
    senha.val('');
    if(toHash.length == 0) return false;
    
    var pass = $(`#${passwordID}`);
    pass.val(CryptoJS.SHA256(toHash).toString());
    return true;
  }

}

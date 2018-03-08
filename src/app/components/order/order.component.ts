import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from '../../services/session.service';
import { HttpService } from'../../services/http.service';
import { UtilService } from '../../services/util.service';

import { OrderRequest } from '../../models/OrderRequest';
import { ProductInfo } from '../../models/ProductInfo';
import { LoginRequest } from '../../models/LoginRequest';

import { AmValidaors } from '../../AmValidators';

import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    loginForm: FormGroup;
    orderForm: FormGroup;

    logged = false;

    constructor(
        private sessionService: SessionService,
        private httpService: HttpService,
        private utilService: UtilService,
        private formBuilder: FormBuilder
    ) {
        this.buildLoginForm();
        this.buildOrderForm();
    }

    ngOnInit(){
        for(let i=0; i<3; i++) {
            this.addProduct();
        }
    }

    buildLoginForm() {
        this.loginForm = this.formBuilder.group({
            cpf: ['', [Validators.required, AmValidaors.invalidCpf()]],
            // name: ['', [Validators.required]],
            // email: ['', [Validators.email]],
            // senha: ['', [Validators.required, Validators.minLength(6)]],
            password: ['']
        });

        let fromObserver = false;
        const emailObserver = (value: string) => {
            let senha = this.loginForm.get('senha');
            if(!senha) return;
            fromObserver = !fromObserver;
            if(!fromObserver) return;
            if(value.length > 0) {
                senha.setValidators(AmValidaors.invalidPassword(true, 6));
            } else {
                senha.setValidators(AmValidaors.invalidPassword(false, 6));
            }
            senha.updateValueAndValidity();
        }

        const senhaObserver = (value: string) => {
            let email = this.loginForm.get('email');
            if(!email) return;
            fromObserver = !fromObserver;
            if(!fromObserver) return;
            if(value.length > 0) {
                email.setValidators(Validators.email);
            } else {
                email.setValidators(AmValidaors.invalidEmail());
            }
            email.updateValueAndValidity();
        }

        this.loginForm.get('cpf').valueChanges.forEach((value: string) => {
            let cpf = value ? value.toString().replace(/[^\d]+/g,'') : "";
            if(AmValidaors.isCpfValid(cpf)) {
                this.httpService.getUserExists(cpf).subscribe(res => {
                    this.sessionService.userExists = res;
                    if(res.err) console.error(res.err);
                    else {
                        if(!res.registered) {
                            this.loginForm.addControl('email', this.formBuilder.control('', AmValidaors.invalidEmail()));
                            this.loginForm.get('email').valueChanges.forEach(emailObserver);
                            if(!res.exists) {
                                this.loginForm.addControl('name', this.formBuilder.control('', Validators.required));
                            }
                        }
                        this.loginForm.addControl('senha', this.formBuilder.control('', AmValidaors.invalidPassword(res.registered, 6)));
                        this.loginForm.get('senha').valueChanges.forEach(senhaObserver);
                    }
                }, err => {
                    console.error(err);
                });
            } else {
                this.loginForm.removeControl('name');
                this.loginForm.removeControl('email');
                this.loginForm.removeControl('senha');
            }
        });
    }

    prepareLogin(): LoginRequest {
        let cpfValue = this.loginForm.get('cpf').value;
        let cpf = cpfValue ? cpfValue.toString().replace(/[^\d]+/g,'') : "";
        let password = this.loginForm.get('password').value;
        return new LoginRequest(cpf, password);
    }

    onLogin() {
        let password = this.utilService.encryptFormWithPassword(this.loginForm.get('senha'), this.loginForm.get('password'));
        if(!password) return false;
        let request = this.prepareLogin();
        this.httpService.postLogin(request).subscribe(res => {
            console.log(res);
            if(res.err) console.error(res.err);
            else {
                console.log(res);
                this.sessionService.setUser(res.user);
                this.sessionService.setHash(res.session);
                this.logged = true;
            }
        }, err => {
            console.error(err);
        });
    }

    buildOrderForm() {
        this.orderForm = this.formBuilder.group({
            products: this.formBuilder.array([])
        });
    }

    setProducts(products: ProductInfo[]) {
        let productFormGroups = _.map(products, product => this.formBuilder.group(product));
        let productFormArray = this.formBuilder.array(productFormGroups);
        this.orderForm.setControl('products', productFormArray);
    }

    getProducts(): FormArray {
        return this.orderForm.get('products') as FormArray;
    }

    addProduct() {
        this.getProducts().push(this.formBuilder.group(new ProductInfo('', 0)));
    }

    removeProduct(i: number) {
        this.getProducts().removeAt(i);
    }

    prepareOrder(): OrderRequest {
        let formModel = this.orderForm.value;

        let products: ProductInfo[] = formModel.products.map(
            (product: ProductInfo) => Object.assign({}, product)
        );

        return new OrderRequest(products);
    }

    onOrderSubmit() {
        let request = this.prepareOrder();
        this.httpService.postOrder('14584367728', request).subscribe(
            res => {
                console.log(res);
            }, err => {
                console.error(err);
            }
        );
    }

    /*
    ngOnInit() {

        this.httpService.getAddress(this.sessionService.getUser().getCpf(), this.sessionService.getHash()).subscribe(res => {
            if(res.err || !res.logged) return;
            
            if(res.address.line1) $('#line1').val(res.address.line1);
            if(res.address.line2) $('#line2').val(res.address.line2);
            if(res.address.neigh) $('#neigh').val(res.address.neigh);
            if(res.address.city) $('#city').val(res.address.city);
            if(res.address.state) $('#state').val(res.address.state);
            if(res.address.code) $('#code').val(res.address.code);

            let cpfField = $("#cpf");
            cpfField.val(this.sessionService.getUser().getCpf());
            cpfField.attr("disabled", "true");

            let passField = $("#pass");
            passField.attr("disabled", "true");
        });

        let addProductRow = $("#add-product-row");
        for(let i=0; i<5; i++) {
            this.addProductField(addProductRow);
        }

        let addProductButton = $("#add-product");
        addProductButton.click(() => {
            if(addProductRow) this.addProductField(addProductRow);
        });

        let sendOrderButton = $("#send-order");
        sendOrderButton.click(() => {
            let line1 = $('#line1');
            let line2 = $('#line2');
            let neigh = $('#neigh');
            let city = $('#city');
            let state = $('#state');
            let code = $('#code');
            let address = {
                line1: line1.val(),
                line2: line2.val(),
                neigh: neigh.val(),
                city: city.val(),
                state: state.val(),
                code: code.val()
            };

            let allFilled = true;

            const setRed = (el) => {
                allFilled = false;
                if(!el) return;
                el.css('background-color', '#ff8888');
                el.blur(() => {
                    el.css('background-color', 'white');
                    el.blur(() => {});
                });
            }
            if(!address.line1) setRed(line1);
            if(!address.neigh) setRed(neigh);
            if(!address.city) setRed(city);
            if(!address.state) setRed(state);
            if(!address.code) setRed(code);

            if(!allFilled) return;

            let products = [];
            for(let i=0; i<this.productFields; i++) {
                let url = $(`#url${i}`).val();
                let qt = $(`#qt${i}`).val();
                if(url && qt && qt > 0) products.push({url: url, qt: qt});
            }

            if(products.length == 0) return;

            this.httpService.postOrder({
                cpf: this.sessionService.getUser().getCpf(),
                session: this.sessionService.getHash(),
                products: products,
                address: address
            }).subscribe(res => {
                if(res.err) console.error(res.err);
                else console.log(res);
            });
        });

    }

    genProductFieldTemplate(i) {
        return `
        <tr id="tr${i}">
            <td>
                <input type="text" name="url${i}" id="url${i}" placeholder="Link" style="width: 100%">
            </td>
            <td>
                <input type="number" name="qt${i}" id="qt${i}" placeholder="QTD" style="width: 100%">
            </td>
            <td>
                <input type="button" name="remove${i}" id="remove${i}" value="X" style="width: 100%">
            </td>
        </tr>
        `;
    }

    addProductField(el) {
        if(!el) return;
        var i = this.productFields;
        el.before(this.genProductFieldTemplate(i));
        var removeButton = $(`#remove${i}`);
        if(removeButton) removeButton.click(() => {
            var tr = $(`#tr${i}`);
            if(tr) {
                tr.remove();
            }
        });
        this.productFields++;
    }
    */

}

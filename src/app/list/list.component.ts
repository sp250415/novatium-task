import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cartProductList: any[] = [];
  prodList: any;
  userID: any;
  constructor(private listService: ListService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    var strUserId: any = localStorage.getItem('user_id');
    this.userID = JSON.parse(strUserId)
    this.getListData();
  }

  getListData() {
    this.listService.postList().subscribe(data => {
      this.prodList = data;
    })
  }

  add(product: any) {
    const isProdInCart = this.cartProductList.find(({ name }) => name === product.name);
    if (!isProdInCart) {
      this.cartProductList.push({ ...product, qty: 1, totalPrice: 1 * product.price });
    } else {
      isProdInCart.qty += 1;
      isProdInCart.totalPrice = isProdInCart.qty * isProdInCart.price;
    }
    var payload = {
      'id': this.userID,
      'prodList': this.cartProductList
    }

    this.loginService.postCart(payload).subscribe((data: any) => {
    })
  }

  getCart() {
    this.router.navigate(['/cart']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: any;
  userID: any;
  totalPrice: any;

  constructor(public cartService: CartService, public router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    var strUserId: any = localStorage.getItem('user_id');
    this.userID = JSON.parse(strUserId)
    this.getCart();
  }

  getCart() {
    var id = {
      'id': this.userID
    }
    this.loginService.getCartListProd(id).subscribe((data: any) => {
      if (data.data.cart != 0) {
        this.cartList = data.data.cart;
        this.totalPrice = 0;
        this.cartList.forEach((item: any) => this.totalPrice += item.totalPrice);
      } else {
        alert('No products found add some products');
        this.router.navigate(['/list']);
      }
    });
  }
  confirm() {
    let payload = {
      'id' : this.userID,
      'orderedItems' : this.cartList
    }
    this.loginService.postOrder(payload).subscribe((data:any) => {
      if(data.success){
        let value = {
          'id' : this.userID,
          'prodList': []
        }
        this.loginService.postCart(value).subscribe((data: any) => {
        })
       }
    });
    alert('Your order Has been placed!!')
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/list'])
  }
}

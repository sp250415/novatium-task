import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  //signup
  postSignUp(data: any) {
    return this.http.post("http://localhost:3000/register", data)
  }
  //login
  postLogin(data: any) {
    return this.http.post("http://localhost:3000/login", data);
  }
  //post cart products
  postCart(cartData: any) {
    return this.http.post("http://localhost:3000/postCart", cartData)
  }
  //get cart list
  getCartListProd(data: any) {
    const params = new HttpParams()
      .set("id", data.id)
    return this.http.get("http://localhost:3000/getCart", { params })
  }
  //post cart products
  postOrder(orderData: any) {
    return this.http.post("http://localhost:3000/postOrder", orderData)
  }

}

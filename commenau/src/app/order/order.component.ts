import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order';
import { CartService } from '../Services/cart.service';
import { UserService } from '../Services/user.service';
import { VoucherService } from '../Services/voucher.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  items :any;
  public day: Date = new Date();
  orderInfo: Order = new Order()
  constructor(private cartService: CartService, private voucherService: VoucherService, private router: Router,private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.items = this.cartService.getCartItems();
    ;
    this.orderInfo = this.cartService.orderInfo;
  }
  getDisCount(){
    return this.voucherService.getDiscount();
  }
  getAllTotal(){
    return this.cartService.getTotal() - this.getDisCount();
  }
  createNewOrder(){
    this.cartService.setCartItems([]);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/trangchu';
      this.router.navigateByUrl(returnUrl);
  }

}

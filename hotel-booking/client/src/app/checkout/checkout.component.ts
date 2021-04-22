import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  {
  message: any;
  constructor(private http:HttpClient) {}
  onSubmit(data: any) {
      // console.log('data', data['Room Key']);
      const { roomkey, userName, userEmail } = data;
      let reqObject = { bookingID : +roomkey, userName, userEmail }
      this.http.post('http://localhost:3000/user/checkout-user', reqObject)
      .subscribe((res:any) =>{
        if(res){
          console.log('res', res.message);
          this.message = res.message;
        }
      })
  }

}

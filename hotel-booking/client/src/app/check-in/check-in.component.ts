import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  constructor(private http:HttpClient) {}
  message: any;

  onSubmit(data: any) {
      // console.log('data', data['Room Key']);
      const { roomkey, userName, userEmail } = data;
      let reqObject = { bookingID : +roomkey, userName, userEmail }
      this.http.post('http://localhost:3000/user/check-booking', reqObject)
      .subscribe((res: any) => {
        if(res){
          this.message = res.message;
        }
      });
  }
}

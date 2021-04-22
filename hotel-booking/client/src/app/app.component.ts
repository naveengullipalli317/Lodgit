import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private http:HttpClient) {}
  onSubmit(data: any) {
      // console.log('data', data['Room Key']);
      const { roomkey, userName, userEmail } = data;
      let reqObject = { bookingID : +roomkey, userName, userEmail }
      this.http.post('http://localhost:3000/user/check-booking', reqObject)
      .subscribe(res => console.log('res data', res))
  }
}

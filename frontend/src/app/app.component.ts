import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private _router:Router) { }

  ngOnInit(): void {
    this.update_nav()
  }

  update_nav(){
    console.log(sessionStorage.getItem('logged_in'))
    if(sessionStorage.getItem('logged_in')){
      document.getElementById('loggedInNav').hidden = false;
      document.getElementById('loggedOutNav').hidden = true;
      if(sessionStorage.getItem('user_email') == "admin@gmail.com")
      {
        var admin_funs = document.getElementsByClassName('admin')
        for(let i=0;i<admin_funs.length;i++){
            (<HTMLUListElement>admin_funs[i]).hidden = false;
        }
      }
      else{
        var admin_funs = document.getElementsByClassName('admin')
        for(let i=0;i<admin_funs.length;i++){
            (<HTMLUListElement>admin_funs[i]).hidden = true;
        }
      }
    }
    else{
      document.getElementById('loggedInNav').hidden = true;
      document.getElementById('loggedOutNav').hidden = false;
    }
  }

  logout(){
    sessionStorage.clear();
    this.update_nav();
    this._router.navigate(['/login'])
  }
}

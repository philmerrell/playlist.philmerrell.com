import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.page.html',
  styleUrls: ['./callback.page.scss'],
})
export class CallbackPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  // ngOnInit() {}

  ngOnInit() {
    this.route.queryParams.subscribe( async (params) => {
      const code = params['code'];
      const state = params['state'];

      try {
        const response = await this.authService.getTokensFromCognito({code, state}).toPromise();
        await this.authService.saveTokensToLocalStorage(response);
        this.router.navigateByUrl('/', { replaceUrl: true });
      } catch (error) {
        console.log(error);
        alert('Uh oh.');
      }
    });
  }

}

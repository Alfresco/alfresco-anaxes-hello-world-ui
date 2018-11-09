import { Component } from '@angular/core';
import { AppConfigService, AuthenticationService } from '@alfresco/adf-core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  private token;
  
  private apsUrl;
  private apsLastName;
  private apsEmail;
  private apsError;

  private acsUrl;
  private acsFirstName;
  private acsEmail;
  private acsError;

  private backendUrl;
  private backendMsg;
  private error;
  
  constructor(private http:Http,
        private appConfig: AppConfigService, private authenticationService: AuthenticationService) {
          this.token=authenticationService.getToken();
          this.acsUrl=appConfig.get("ecmHost")+"/api/-default-/public/alfresco/versions/1/people/-me-";
          this.apsUrl=appConfig.get("bpmHost")+"/api/enterprise/profile";
          this.backendUrl=appConfig.get("backendHost")+"/hello/welcome";
  }


  private ngOnInit() {
    this.callBackend();
    this.callsToDBP();
  }

  callBackend() {
    this.http.get(this.backendUrl)
      .subscribe(res => {
        this.backendMsg = res.json().value;
      },
      err => {
        this.error = 'ERROR: Hello World Backend Service not responding!';
      });
  }

  callsToDBP() {
    let myHeaders = new Headers();
    myHeaders.set("Authorization", "Bearer " + this.token);
    let options = new RequestOptions({ headers: myHeaders });
    this.callAPS(options);
    this.callACS(options);
  }

  callAPS(options:RequestOptions) {
    this.http.get(this.apsUrl, options)
      .subscribe(res => {
        this.apsLastName = res.json().lastName;
        this.apsEmail = res.json().email;
      },
      err => {
        this.apsError = 'ERROR: Alfresco Process Service not responding!';
      });
  }

  callACS(options:RequestOptions) {
    this.http.get(this.acsUrl, options)
      .subscribe(res => {
        this.acsFirstName = res.json().entry.firstName;
        this.acsEmail = res.json().entry.email;
      },
      err => {
        this.acsError = 'ERROR: Alfresco Content Service not responding!';
      });
  }

}

import { Http, RequestOptions, Response } from '@angular/http';
export class ACSPersonDetailsService {
    url: string;
    firstName: string;
    email: string;
    error: string;
    constructor(acsUrl: string, private http: Http) {
        this.url = acsUrl+"/api/-default-/public/alfresco/versions/1/people/-me-";
    }
    public callPersonDetailsService(options:RequestOptions) {
      this.http.get(this.url,options).
        map((res: Response) => res.json()).subscribe(data => {
          this.firstName=data.entry.firstName;
          this.email=data.entry.email;
        },
        err => {
          this.error = 'ERROR: Could not reach ACS Endpoint!';
        });
    }  
}
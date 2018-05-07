import { Http, RequestOptions, Response } from '@angular/http';
export class APSPersonDetailsService {

  url: string;
  lastName: string;
  email: string;
  error: string;
  constructor(apsUrl: string, private http: Http) {
    this.url = apsUrl + "/activiti/api/enterprise/profile";
  }
  callPersonDetailsService(options:RequestOptions) {
    this.http.get(this.url, options).
        map((res: Response) => res.json()).subscribe(data => {
            this.lastName = data.lastName;
            this.email = data.email;
        },
        err => {
            this.error = 'ERROR: Could not reach APS Endpoint!';
        });
    }
}

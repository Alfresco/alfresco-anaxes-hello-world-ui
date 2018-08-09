/*
 * Copyright 2018 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AppConfigService } from 'ng2-alfresco-core';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from "angular-oauth2-oidc";
import { APSPersonDetailsService } from './apsPersonDetailsService';
import { ACSPersonDetailsService } from './acsPersonDetailsService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private id;
  private sub: any;
  private apiUrl;
  aps;
  acs;
  data: any ={};
  msg;

  constructor(private route: ActivatedRoute, private http:Http,
        appConfig: AppConfigService, private oauthService: OAuthService) {
          this.apiUrl = appConfig.get('backEndHost');
          this.aps = new APSPersonDetailsService(appConfig.get('apsHost'),http);
          this.acs = new ACSPersonDetailsService(appConfig.get('acsHost'),http);
  }

  private ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
      });
    this.dbpEndpointsConsumtion();
    this.getResponse(this.id);
  }

  getResponse(id) {
     this.apiUrl += id;
     console.debug("apiUrl", this.apiUrl);
     let accessToken = this.oauthService.getAccessToken();
     console.debug('access-token', accessToken);
     let myHeaders = new Headers();
     myHeaders.set("Authorization", "Bearer " + accessToken);
     let options = new RequestOptions({ headers: myHeaders });
     return this.http.get(this.apiUrl, options).
       map((res: Response) => res.json()).subscribe(data => {
         this.msg=data.value;
         this.data = data;
       },
       err => {
         this.msg = 'ERROR: Something went wrong!';
       })
   }
  dbpEndpointsConsumtion() {
    let accessToken = this.oauthService.getAccessToken();
    console.debug('access-token', accessToken);
    let myHeaders = new Headers();
    myHeaders.set("Authorization", "Bearer " + accessToken);
    let options = new RequestOptions({ headers: myHeaders });
    this.aps.callPersonDetailsService(options);
    this.acs.callPersonDetailsService(options);
    
  }
}

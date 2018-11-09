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
import { ActivatedRoute } from '@angular/router';
import { FormRenderingService } from '@alfresco/adf-core';
import { CustomEditorComponent } from '../stencils.module';
import { PreviewService } from '../services/preview.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  appId: string = null;
  taskId: string = null;
  fileShowed: any = null;
  content: any = null;
  contentName: any = null;

  constructor(private route: ActivatedRoute,
              formRenderingService: FormRenderingService,
              private preview: PreviewService) {
    formRenderingService.setComponentTypeResolver('testole_01', () => CustomEditorComponent, true);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.appId && params.appId !== '0') {
          this.appId = params.appId;
      }
      if (params.taskId) {
        this.taskId = params.taskId;
      }
    });
  }

  onContentClick(content: any): void {
    if (content.contentBlob) {
      this.preview.showBlob(content.name, content.contentBlob);
    } else {
      this.preview.showResource(content.sourceId.split(';')[0]);
    }
  }

}

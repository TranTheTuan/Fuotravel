import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

const url = 'http://localhost:8000/api/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {
  }

  public upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {
    const status: { [key: string]: { progress: Observable<number> } } = {};
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });
      const progress = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }
}

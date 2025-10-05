import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class Openai {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-5', 
      messages: [
        { role: 'user', content: message }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}

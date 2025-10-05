import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message, Openai } from './openai'

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  messages: Message[] = [];
  value: string = '';

  constructor(private openai: Openai) {}

  ngOnInit() {
  }

  sendMessage(event: any) {
    const userText = {
      content: event.target.value,
      author: 'user'
    }
    this.messages.push(userText)
    this.openai.sendMessage(event.target.value).subscribe((res: any)=>{
      const botText = res.choices[0].message.content;
      this.messages.push({
        content: botText,
        author: 'bot'
      })
    })
    event.target.value = '';
  }
}

import { Component } from '@angular/core';
import { AuthModel } from '@mean/models';
import { ApiService, AuthService, ChatService, Message } from '@mean/services';
import { BaseComponent } from '@mean/shared';
import { UriConstants } from '@mean/utils';
import { SessionStorageConstants } from 'src/app/utils/session.storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent<Message>{
  showTyping = false;
  messages: Message[] = [];
  userData!: AuthModel.User;
  inputValue: string = "";
  counter = 0;

  constructor(
    protected readonly api: ApiService<Message>,
    private readonly chatService: ChatService,
    private readonly authService: AuthService
  ){
    super(api);
    this.userData = this.authService.readFromSession(SessionStorageConstants.USER_TOKEN).user;
    this.getMessage();
    this.chatService.getMessage().subscribe({
      next: (data) => {
        this.messages = data;
      }
    });
    this.chatService.getUserListening().subscribe(val => {
      console.log(val);
        if(typeof val === 'boolean'){
          this.showTyping = false;
        }else{
          this.showTyping = this.userData.id !== val.id
        }
      }
    )
  }

  private async getMessage(){
    this.messages = (await this.searchArrAsync({url: UriConstants.MESSAGES})).response;
  }

  saveMessage(){
    if(this.inputValue){
      const payload = { userId: this.userData.id, content: this.inputValue };
      this.create({url: `${UriConstants.MESSAGES}/store`, data: payload});
      this.inputValue = "";
      this.stopTyping();
    }
  }

  handleDeleteMessage(id: number){
    this.delete({url:`${UriConstants.MESSAGES}/${id}`});
  }

  startTyping(){
    this.counter ++;
    if(this.counter === 1) {
      this.chatService.sendTyping(this.userData);
    }
  }

  stopTyping(){
    this.counter = 0;
    this.chatService.sendTyping(false);
  }

}

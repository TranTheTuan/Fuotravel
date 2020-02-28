import {Component, Input, OnInit} from '@angular/core';
import {MemberService} from '../services/member.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() memberableId;
  @Input() memberable;
  sentRequest = false;
  joined = false;
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
  }
  onSendRequest(memberableId: any, memberable: any) {
    this.memberService.join(memberableId, memberable)
      .subscribe(res => {
        if (res.data) {
          this.sentRequest = true;
        }
      });
  }
  onCancelRequest(memberableId: any, memberable: any) {
    this.memberService.cancel(memberableId, memberable)
      .subscribe(res => {
        if (res.data) {
          this.sentRequest = false;
        }
      });
  }

}

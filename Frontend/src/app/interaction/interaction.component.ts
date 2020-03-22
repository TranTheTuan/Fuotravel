import {Component, Input, OnInit} from '@angular/core';
import {MemberService} from '../services/member.service';

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.css']
})
export class InteractionComponent implements OnInit {
  @Input() planId;
  sentRequest = false;
  joined = false;
  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
  }
  onSendRequest(planId: any) {
    this.memberService.join(planId)
      .subscribe(res => {
        if (res.data) {
          this.sentRequest = true;
        }
      });
  }
  onCancelRequest(planId: any) {
    this.memberService.cancel(planId)
      .subscribe(res => {
        if (res.data) {
          this.sentRequest = false;
        }
      });
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {dateFormat} from '../../../utility/helpers/date-format';
import {Subject} from 'rxjs';
import {TagService} from '../../../utility/services/tag.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlanService} from '../../../utility/services/plan.service';
import {WebSocketService} from '../../../utility/services/web-socket.service';
import {AuthService} from '../../../utility/services/auth.service';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {
  preview;
  planId;
  error: Subject<any> = new Subject<any>();
  createPlanForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    cover: [''],
    departure: ['', [Validators.required, Validators.maxLength(500)]],
    start_at: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    arrival_at: ['', [Validators.required]],
    members_quantity: ['', [Validators.required, Validators.min(2)]]
  });

  constructor(
    private planService: PlanService,
    private tagService: TagService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private webSocketService: WebSocketService,
    private dialogRef: MatDialogRef<PlanCreateComponent>
  ) {
  }

  ngOnInit(): void {
  }

  onCreatePlanSubmit() {
    if (!this.authService.checkAuth()) {
      return;
    }
    const formValue = this.createPlanForm.value;
    formValue.start_at = dateFormat(formValue.start_at);
    formValue.arrival_at = dateFormat(formValue.arrival_at);
    this.planService.createPlan(formValue).subscribe(res => {
      if (res.data) {
        this.planId = res.data.id;
        const newRoom = 'plan_room_' + this.planId;
        this.webSocketService.emit('new-room', newRoom);
        this.authService.updateUserRooms('plan', this.planId);
        this.snackBar.open('Plan created, go to next step to add tags',
          'Close', {duration: 5000});
      }
    }, err => {
      this.error.next(err.error.message);
    });
  }

  onCancel() {
    if (this.planId) {
      this.router.navigate(['plans', this.planId]);
    }
    this.dialogRef.close();
  }

  onFileChange(event) {
    const file: File = event.target.files[0];
    this.createPlanForm.patchValue({
      cover: file
    });
    // this.createPlanForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }

  onDone() {
    this.dialogRef.close();
    this.router.navigate(['/plans', this.planId]);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {dateFormat} from '../../helpers/date-format';
import {Subject} from 'rxjs';
import {Tag} from '../../models';
import {TagService} from '../../services/tag.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TAG_PLAN} from '../../helpers';
import {PlanService} from '../../services/plan.service';
import {WebSocketService} from '../../services/web-socket.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {
  preview;
  planId;
  error: Subject<any> = new Subject<any>();
  tags: Tag[];
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
  tagForm = this.fb.group({
    tags: this.fb.array([])
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
    this.getTags();
  }

  onCreatePlanSubmit() {
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

  onUpdateTagsSubmit() {
    const selectedIds = this.tagForm.value.tags
      .map((v, i) => (v ? this.tags[i].id : null))
      .filter(v => v !== null);
    this.tagService.updateTags(this.planId, TAG_PLAN, selectedIds)
      .subscribe(res => {
        this.snackBar.open('Updated tags',
          'Close', {duration: 3000});
      }, error => console.log(error));
  }

  getTags() {
    this.tagService.getAll().subscribe(res => {
      this.tags = res.data;
      this.tagForm = this.fb.group({
        tags: this.buildTagsArray(this.tags)
      });
    }, error => console.table(error.error.message));
  }

  get tagsArray() {
    return this.tagForm.get('tags') as FormArray;
  }

  buildTagsArray(tags: Tag[]) {
    const tagsArr = tags.map(tag => {
      return this.fb.control(false);
    });
    return this.fb.array(tagsArr);
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

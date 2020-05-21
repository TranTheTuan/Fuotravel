import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import {dateFormat} from '../../helpers/date-format';
import {Plan, Tag} from '../../models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TagService} from '../../services/tag.service';
import {TAG_PLAN} from '../../helpers';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlanService} from '../../services/plan.service';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {
  error;
  planId;
  preview;
  tags: Tag[];
  updatePlanForm = this.fb.group({
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
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdatePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.planId = this.data.plan.id;
    this.updatePlanForm.patchValue({
      title: this.data.plan.title,
      description: this.data.plan.description,
      departure: this.data.plan.departure,
      start_at: this.data.plan.start_at,
      destination: this.data.plan.destination,
      arrival_at: this.data.plan.arrival_at,
      members_quantity: this.data.plan.members_quantity
    });
    this.getTags();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpdatePlanSubmit() {
    const formValue = this.updatePlanForm.value;
    formValue.start_at = dateFormat(formValue.start_at);
    formValue.arrival_at = dateFormat(formValue.arrival_at);
    this.planService.updatePlan(formValue, this.planId).subscribe();
    if (this.preview && this.preview !== '') {
      formValue.cover = this.preview;
    }
    this.dialogRef.close(formValue);
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
    const selectedTags = {
      tags: []
    };
    selectedTags.tags = this.tags.filter(tag => selectedIds.includes(tag.id));
    this.dialogRef.close(selectedTags);
  }

  onFileChange(event) {
    const file: File = event.target.files[0];
    this.updatePlanForm.patchValue({
      cover: file
    });
    // this.createPlanForm.get('cover').updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }

  setCheckedStatus(tagId: any) {
    const index = this.data.plan.tags.findIndex(tag => tag.id === tagId);
    return index !== -1;
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
      return this.fb.control(this.setCheckedStatus(tag.id));
    });
    return this.fb.array(tagsArr);
  }
}

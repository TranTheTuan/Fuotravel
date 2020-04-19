import {Component, Inject, OnInit} from '@angular/core';
import {PlanService} from '../../services';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {dateFormat} from '../../helpers/date-format';
import {Plan} from '../../models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent implements OnInit {
  error;
  planId;
  preview;
  plan: Plan;
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
  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
  }
  onCancel() {
    this.dialogRef.close('canceled');
  }
  onSubmit(formData: any) {
    formData.start_at = dateFormat(formData.start_at);
    formData.arrival_at = dateFormat(formData.arrival_at);
    this.planService.updatePlan(formData, this.planId).subscribe();
    if (this.preview && this.preview !== '') {
      formData.cover = this.preview;
    }
    this.dialogRef.close(formData);
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
}

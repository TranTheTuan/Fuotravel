import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../services';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {dateFormat} from '../../helpers/date-format';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {
  preview = null;
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
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanCreateComponent>
  ) { }

  ngOnInit(): void {
  }
  onSubmit(formData: any) {
    formData.start_at = dateFormat(formData.start_at);
    formData.arrival_at = dateFormat(formData.arrival_at);
    this.planService.createPlan(formData).subscribe(res => {
      if (res.data) {
        const id = res.data.id;
        this.router.navigate(['/plans', id]);
      }
      this.dialogRef.close('done');
    }, err => {
      this.error.next(err.error.message);
    });
  }
  onCancel() {
    this.dialogRef.close('canceled');
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
}

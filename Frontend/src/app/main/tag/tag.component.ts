import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TagService} from '../../utility/services/tag.service';
import {FormArray, FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Tag} from '../../utility/models';
import {TAG_PLAN} from '../../utility/helpers';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() taggableType = TAG_PLAN;
  @Input() taggableId;
  @Input() haveNext = true;
  @Input() isDialog = true;
  @Input() checkedTags: Tag[] = [];
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  tags: Tag[];
  tagForm = this.fb.group({
    tags: this.fb.array([])
  });

  constructor(
    private tagService: TagService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.getTags();
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

  getTags() {
    this.tagService.getAll().subscribe(res => {
      this.tags = res.data;
      this.tagForm = this.fb.group({
        tags: this.buildTagsArray(this.tags)
      });
    }, error => console.table(error.error.message));
  }

  setCheckedStatus(tagId: any) {
    const index = this.checkedTags.findIndex(tag => tag.id === tagId);
    return index !== -1;
  }

  onCancel() {
    this.cancel.emit();
  }

  onUpdateTagsSubmit() {
    const selectedIds = this.tagForm.value.tags
      .map((v, i) => (v ? this.tags[i].id : null))
      .filter(v => v !== null);
    const selectedTags = {
      tags: []
    };
    selectedTags.tags = this.tags.filter(tag => selectedIds.includes(tag.id));
    this.tagService.updateTags(this.taggableId, this.taggableType, selectedIds)
      .subscribe(res => {
        this.update.emit(selectedTags);
        this.snackBar.open('Updated tags',
          'Close', {duration: 3000});
      }, error => console.log(error));
  }
}

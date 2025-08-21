import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { mimeType } from './mime.type.validator';


@Component({
  selector: 'app-post-create',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
})
export class PostCreate implements OnInit {
  enteredContent: string = '';
  enteredTitle: string = '';
  newPost = '';
  private mode = 'create';
  postId: string = '';
  isLoading = false;
  post!: Post;

  imagePreview: string | ArrayBuffer = '';
 form !: FormGroup ;


  constructor(
    private postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading=true;

    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      this.form.reset();
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
  }
  ngOnInit(): void {
   this.form  =new FormGroup({
    'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
    'content': new FormControl(null, {validators: [Validators.required]}),
    'image' : new FormControl(null, {validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')!;
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({'title': this.post.title, 'content':this.post.content, 'image': this.post.imagePath})
        });
      } else {
        this.mode = 'create';
        this.postId = '';
        this.post = {
          id: '',
          title: '',
          content: '',
          imagePath:'',
          creator:''
        };
      }
    });
  }

onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  this.form.patchValue({ image: file });
  this.form.get('image')?.updateValueAndValidity();

  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result!;
  };
  reader.readAsDataURL(file);
}
}

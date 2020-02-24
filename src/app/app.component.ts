import { Component, OnInit } from '@angular/core';
import {Post} from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  postService:PostsService;  
  isFetching:boolean = false;
  constructor(postService:PostsService) {
    this.postService=postService;
  }

  ngOnInit() {
    this.onFetchPosts();
    this.postService.errorHandler.subscribe((error)=>{
      console.log(error);//Log error when post request fails
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePost(postData.title,postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching=true
    this.postService.fetchPosts().subscribe((posts)=>{
      this.isFetching=false;
      this.loadedPosts=posts;
    },(error)=>{
      this.isFetching=false;
      console.log(error);
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe((data)=>{
      this.loadedPosts=[];
      console.log(data);
    });
  }
}

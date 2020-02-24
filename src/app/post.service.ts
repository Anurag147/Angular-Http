import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class PostsService{
    
    http: HttpClient;
    errorHandler:Subject<string>;

    constructor(http: HttpClient) {
        this.http=http;
        this.errorHandler = new Subject<string>();
      }
      
    
    createAndStorePost(title:string,content:string){ 
        const postData:Post = {title:title,content:content}
       this.http
      .post<{name:string}>(//{name:string} is the return type for this post
        'https://ng-complete-a3113.firebaseio.com/posts.json',//Posting data to firebase
        postData,
        {
            observe:'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);//When the response is recieved;Subscribing to it is mandatory
      },(error)=>{
          this.errorHandler.next(error.message);
      });
    }

    fetchPosts(){
        //Setting up request parameters
        let paramsRequest=new HttpParams();
        paramsRequest=paramsRequest.append('print','pretty');
        paramsRequest=paramsRequest.append('custom','key');

        return this.http.get('https://ng-complete-a3113.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders
            ({
                'Custom-Header':'Hello'//Adding a custom header in get request
            }),
            params: paramsRequest,//Adding a query parameter in get request
            responseType:'json' //Get the api response as json here
        })
        .pipe(map((responseData:{ [key:string]:Post})=>{
        const postArray:Post[]=[];
        for(const key in responseData){
            postArray.push({...responseData[key],id:key}); //Transform the data using map
        }
        return postArray;
        }));
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-a3113.firebaseio.com/posts.json');
    }
}
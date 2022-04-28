import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comments';
import { CommentService } from '../../service/comment.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  listComments: Comment[] = [];
  dark: boolean = false;

  constructor(
    private _commentService: CommentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this._commentService.getComments().subscribe(
      (data) => {
        this.listComments = data;

      }, (error: any) => {
        console.log(error);
      })
  }

  likeComment(_id: any) {
    console.log("Me gusta")
    this._commentService.likeComment(_id).subscribe((data: Object) => {
      this.getComments();
    }, (error: any) => {
      console.log(error);
    });
  }
  deleteComment(_id: any) {
    this._commentService.deleteComment(_id).subscribe((data: Object) => {
      this.toastr.error('The comment has been deleted', 'Comment deleted');
      this.getComments();
    }, (error: any) => {
      console.log(error);
    });
  }

  changeMode() {
    if (this.dark) {
      this.dark = false;
    }
    else {
      this.dark = true;
    }
  }

}

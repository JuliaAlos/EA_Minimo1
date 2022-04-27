import { Component, OnInit, ViewChild } from '@angular/core';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/service/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-book',
  templateUrl: './listar-book.component.html',
  styleUrls: ['./listar-book.component.css']
})
export class ListarBookComponent implements OnInit {
  listBooks: Book[] = [];
  dataSource = new MatTableDataSource(this.listBooks);
  displayedColumns: string[] = [
    '_id',
    'title',
    'ISBN',
    'photoURL',
    'description',
    'publishedDate',
    'editorial',
    'rate',
    'categories',
    'actions',
  ];

  constructor(
    private _bookService: BookService,
    private toastr: ToastrService) { }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this._bookService.getBooks().subscribe(
      (data) => {
        console.log(data);
        this.listBooks = data;
        this.dataSource = new MatTableDataSource(this.listBooks);
        this.dataSource.paginator = this.paginator;
      }, (error: any) => {
        console.log(error);
      })
  }

  deleteBook(_id: any) {
    this._bookService.deleteBook(_id).subscribe((data: Object) => {
      this.toastr.error('The book has been deleted', 'Book deleted');
      this.getBooks();
    }, (error: any) => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

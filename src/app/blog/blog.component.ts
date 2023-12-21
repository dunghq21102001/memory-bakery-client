import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  //paginate
  page = 1
  perPage: number = 5
  totalItem: any = 0
  totalPage: any = []

  // orther
  blogsList: any
  outstandingList: any
  errMess: string = ''
  constructor(private service: BlogService) {
    this.getList()
    this.getOutstandingList()
  }

  getList(page: any = 1) {
    this.page = page
    this.service.getBlogsList(this.page).subscribe({
      next: (data) => {
        this.blogsList = data.data
        this.totalItem = data.totalItem

        let pageTmp = Math.ceil(this.totalItem / this.perPage)
        this.totalPage = Array(pageTmp)
      },
      error: (err) => { this.errMess = err }
    })
  }

  getOutstandingList() {
    this.service.getBlogsOutstanding().subscribe({
      next: (data) => {
        this.outstandingList = data
      },
      error: (err) => { this.errMess = err }
    })
  }

  convertDate(date: any) {
    let fDate = new Date(date)
    return fDate.toLocaleString()
  }

  paginateIcon(type: string) {

    switch (type) {
      case 'pre': {
        this.page -= 1
        if (this.page < 1) this.page = 1
        this.getList(this.page)
        break
      }
      case 'next': {
        this.page += 1
        if (this.page > this.totalPage.length) this.page = 1
        this.getList(this.page)
        break
      }
    }
  }
}

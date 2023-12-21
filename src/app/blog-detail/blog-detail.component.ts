import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {

  blog: any
  outstandingList: any
  errMess: string = ''
  constructor(private service: BlogService, private route: ActivatedRoute) {
    this.getDetail()
    this.getOutstandingList()
  }

  getDetail() {
    let id = this.route.snapshot.paramMap.get('id')
    this.service.getABlog(id).subscribe({
      next: (data) => {
        this.blog = data
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
}

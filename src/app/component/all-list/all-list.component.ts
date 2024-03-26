import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from 'src/app/core/service/list.service';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {List} from 'src/app/core/interface/list'
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-all-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.scss'],
})
export class AllListComponent implements OnInit {

  constructor(private _ListService:ListService,private _ToastrService :ToastrService){}
  MessageError!:string;
  checkCorrectData:boolean = false;
  list:List[]= [];
  index!:number;
  listId!:string;

  ngOnInit(): void {
    this._ListService.getUserList().subscribe({
      next:(res)=>{
        this.list = res.notes
      },
      error:(err)=>{console.log(err)},

    })
  }

  addForm:FormGroup = new FormGroup({
    title: new FormControl(null),
    content:new FormControl(null),
  })


  addList()
  {
      this.checkCorrectData = true;
      this._ListService.addList(this.addForm.value).subscribe({
        next:(res)=>{
          if(res.msg=='done')
          {
            this._ToastrService.success('To Do Added Successfuly','Success');
            this.checkCorrectData=false;
            this.list?.push(res.note);
            this.addForm.get('title')?.setValue('');
            this.addForm.get('content')?.setValue('');
          }
        },
        error:(err)=>{
          this.MessageError = err.error.msg;
          this.checkCorrectData = false;
        },
      })
  }

  removeList(listId:string,index:number)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{

          this._ListService.removeList(listId).subscribe({
            next:(res)=>{
              if(res.msg=='done')this
              {
                this.list.splice(index,1)
              }
            },
            error:(err)=>{
             console.log(err);
            },
          })

        })
      }
    });
    
  }

  updateForm:FormGroup = new FormGroup({
    title:new FormControl(null), 
    content:new FormControl(null), 
  })

  update(listId:string,index:number,list:List)
  {
    this.updateForm.get('title')?.setValue(list.title);
    this.updateForm.get('content')?.setValue(list.content);

    this.listId = listId;
    this.index = index;
  }

  updateList()
  {
    this.checkCorrectData = true;
    this._ListService.updateList(this.updateForm.value,this.listId).subscribe({
      next:(res)=>{
        if(res.msg=='done')
        {
          this.checkCorrectData = false;
          this.list.splice(this.index,1,res.note);
          this._ToastrService.success('To Do Updated Successfuly','Success');
          this.updateForm.get('title')?.setValue('');
          this.updateForm.get('content')?.setValue('');
        }
       
      },
      error:(err)=>{console.log(err)},
    })
  }

}

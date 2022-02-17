import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-technology-modal',
  templateUrl: './add-technology-modal.component.html',
  styleUrls: ['./add-technology-modal.component.css']
})
export class AddTechnologyModalComponent implements OnInit {
  addTechnologyForm: FormGroup;
  
  constructor(public modalRef:BsModalRef,private http:HttpClient,public coursesService:CoursesService, public fb:FormBuilder) {
    this.addTechnologyForm = fb.group({
      title:['',Validators.required],
      tagline:['',,Validators.required] 
    });
   }

  ngOnInit(): void {
  }

  getAlltechnologies(){
    this.coursesService.getAlltechnologies().subscribe((res)=>{
      //this.technologyList=res;
    }) 
  }

  addTechnology(){
    this.coursesService.addTechnology(this.addTechnologyForm.value).subscribe((res)=>{
      //this.getAlltechnologies();
    });
    this.modalRef.hide();
  }

}

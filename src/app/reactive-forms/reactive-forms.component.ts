import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {  FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { QuillEditorComponent } from 'ngx-quill'
import { MatQuill } from '../mat-quill/mat-quill'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module';
import { HttpClient } from '@angular/common/http';
Quill.register('modules/imageResize', ImageResize);
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html'
})
export class ReactiveFormsComponent implements OnInit {
  modalRef?: BsModalRef;
  techName;
  tutorialName;
  techId;
  tutId;
  currentTechnology;
  currentTutorial;
  hide = false
  form: FormGroup
  contentForm: FormGroup
  backgroundColor = ''
  showForm=false;
  modules = {};
  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent
  @ViewChild('matEditor', {
    static: true
  }) matEditor: MatQuill

  apiUrl:string="http://localhost:4000/tutorial";
  technologyList:any;
  conceptList:any;
  tutorialList:any;
  topicsList:any;
  constructor(fb: FormBuilder,public http:HttpClient,private modalService: BsModalService, public coursesService:CoursesService) {    
    this.contentForm = fb.group({
      title:[null],
      tagline:[null],  
      technologyId:[null], 
      tutorialId:[null],
      conceptId:[null],
      content: [null],
      _id:[null]      
    });
    this.modules = {
      formula: true,
      imageResize: {},
      syntax: true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],    
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction    
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],    
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],    
        ['clean'],                                         // remove formatting button    
        ['link', 'image', 'video']                         // link and image, video
      ]
    };
  }

  get topicId(){
    return this.contentForm.get("_id").value;
  }
  get conceptId(){
    return this.contentForm.get("conceptId").value;
  }
  saveTopic(){
    this.coursesService.addTopic(this.contentForm.value).subscribe((res)=>{
      this.getTopics();
    });
  }
  ngOnInit() {    
    this.getAlltechnologies();
  }

  getAlltechnologies(){
    this.coursesService.getAlltechnologies().subscribe((res)=>{
      this.technologyList=res;
    });
  }

  setControl() {
    this.form.setControl('editor', new FormControl('test - new Control'))
    this.form.setControl('matEditor', new FormControl('test - new Control'))
  }

  patchValue() {
    this.form.get('editor').patchValue(`${this.form.get('editor').value} patched!`)
    this.form.get('matEditor').patchValue(`${this.form.get('matEditor').value} patched!`)
  }

  getTuts(){
    this.currentTechnology = this.technologyList.find((technology)=>{
      return technology._id === this.contentForm.get("technologyId")?.value;
    });
    this.techName = this.currentTechnology.title;
    this.showForm = false;
    this.techId = this.contentForm.get('technologyId')?.value;
    this.coursesService.getTutorialListByTechnologyId(this.techId).subscribe((res)=>{
      this.tutorialList=res;
      this.contentForm.get("tutorialId").setValue(null)
      this.conceptList=null;
      this.contentForm.get("conceptId").setValue(null)
      this.topicsList=[];
      this.resetTopicForm();
    });    
  }
  getConcepts(){
    this.currentTutorial = this.tutorialList.find((tutorial)=>{
      return tutorial._id === this.contentForm.get("tutorialId")?.value;
    });
    this.tutorialName = this.currentTutorial.title;
    this.showForm = false;
    this.tutId = this.contentForm.get('tutorialId')?.value
    this.conceptList=null;
    this.contentForm.get("conceptId").setValue(null);
    this.resetTopicForm();
    this.coursesService.getConceptListByTutorialId(this.tutId).subscribe((res)=>{
      this.conceptList=res;
    });
  }
  getTopics(){
    this.showForm = false;
    this.resetTopicForm();
    this.coursesService.getTopicsByConceptId(this.conceptId).subscribe((res)=>{
      this.topicsList=res;
    });
  }
  deleteTopic(topicId){
    this.coursesService.deleteTopic(topicId,this.conceptId).subscribe((res)=>{
      this.getTopics();
    })
  }
  editTopic(topic){
    this.contentForm.patchValue(topic);
    this.showForm=true;
  }
  updateTopic(){
    this.coursesService.updateTopic(this.contentForm.value).subscribe((res)=>{
      this.getTopics();
    })    
  }
  resetTopicForm(){
    this.contentForm.get("content").reset();
    this.contentForm.get("tagline").reset();
    this.contentForm.get("title").reset();
    this.contentForm.get("_id").reset();
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addTechnology(techForm){
    this.coursesService.addTechnology(techForm.value).subscribe((res)=>{
      this.getAlltechnologies();
    });
    this.modalRef.hide();
  }

  addTutorial(tutForm){
    this.coursesService.addTutorial(tutForm.value).subscribe((res)=>{
      this.getTuts();
    });
    this.modalRef.hide();
  }

  addConcept(conceptForm){
    this.coursesService.addConcept(conceptForm.value).subscribe((res)=>{
      this.getConcepts();
    })    
    this.modalRef.hide();
  }
}

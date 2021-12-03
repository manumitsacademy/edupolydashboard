import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { ContentChange, QuillEditorComponent } from 'ngx-quill'
import { debounceTime, distinctUntilChanged, retry } from 'rxjs/operators'
import { MatQuill } from '../mat-quill/mat-quill'
import Quill from 'quill'
import ImageResize from 'quill-image-resize-module'
import { HttpClient } from '@angular/common/http'
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html'
})
export class ReactiveFormsComponent implements OnInit {
  fname;
  lname;
  modalRef?: BsModalRef;
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
  constructor(fb: FormBuilder,public http:HttpClient,private modalService: BsModalService) {    
    this.contentForm = fb.group({
      title:[null],
      tagline:[null],  
      technologyId:[null], 
      tutorialId:[null],
      conceptId:[null],
      content: [null],
      _id:[null]      
    })
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
    }
  }

  abc(){
    console.log("ok");
  }

  get topicId(){
    return this.contentForm.get("_id").value;
  }
  get conceptId(){
    return this.contentForm.get("conceptId").value;
  }
  saveTopic(){
    console.log(this.contentForm.value)
    this.http.post("http://localhost:4000/tutorial/addTopic",this.contentForm.value).subscribe((res)=>{
      console.log("res",res);
      this.getTopics()
    })
  }
  ngOnInit() {    
      this.http.get(`${this.apiUrl}/technologiesList`).subscribe((res)=>{
        console.log("Techs::",res);
        this.technologyList=res;
      })
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
    this.http
    .get(`${this.apiUrl}/tutorialListByTechnologyId?technologyId=${this.contentForm.get('technologyId')?.value}`)
    .subscribe((res)=>{
      console.log("tuts::",res);
      this.tutorialList=res;
      this.contentForm.get("tutorialId").setValue(null)
      this.conceptList=null;
      this.contentForm.get("conceptId").setValue(null)
      this.topicsList=null;
      this.resetTopicForm();
    })
  }
  getConcepts(){
    console.log("HE concepts")
    this.conceptList=null;
    this.contentForm.get("conceptId").setValue(null);
    this.resetTopicForm();
    this.http
    .get(`${this.apiUrl}/conceptListByTutorialId?tutorialId=${this.contentForm.get('tutorialId')?.value}`)
    .subscribe((res)=>{
      console.log("concepts::",res);
      this.conceptList=res;
    })
  }
  getTopics(){
    console.log("HE topics")
    this.resetTopicForm();
    this.http
    .get(`${this.apiUrl}/topicsByConceptId/${this.contentForm.get('conceptId')?.value}`)
    .subscribe((res)=>{
      console.log("topics::",res);
      this.topicsList=res;
    })
  }
  deleteTopic(topicId){
    console.log("delete topic");
    this.http
    .delete(`${this.apiUrl}/deleteTopicById/${topicId}`)
    .subscribe((res)=>{
      this.getTopics();
    })
  }
  editTopic(topic){
    console.log("topic::",topic)
    this.contentForm.patchValue(topic);
    this.showForm=true;
  }
  updateTopic(){
    this.http
    .put(`${this.apiUrl}/updateTopicByTopicId`,this.contentForm.value)
    .subscribe((res)=>{
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

  add(x){
    console.log(x.value)
  }
}

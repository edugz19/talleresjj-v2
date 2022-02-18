import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import * as alertifyjs from 'alertifyjs';
import { Task } from 'src/app/models/task.interface';
import { UsersService } from 'src/app/services/users/users.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  id = this._route.snapshot.paramMap.get('id');
  task!: Task;
  userFullname: string;
  ref: AngularFireStorageReference;
  afTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: string;
  urlText: string;
  style: string;
  progress: string;

  priceForm = this.fb.group({
    price: ['', [Validators.required, Validators.min(1)]]
  });

  constructor(
    private taskSvc: TasksService, 
    public router: Router,
    private _route: ActivatedRoute,
    private userSvc: UsersService,
    private afStorage: AngularFireStorage,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskSvc.getTaskById(this.id).subscribe( task => {
      this.task = task;
      this.progress = this.task.state;
      
      this.userSvc.getUserById(this.task.userId).subscribe( user => {
        this.userFullname = user.fullname;
      });
    });

    // this.getLink();
  }

  // getLink() {
  //   this.afStorage.ref(this.id).listAll().subscribe(links => {
  //     if (links.items.length === 0) {
  //       this.downloadURL = ''
  //       this.urlText = 'No invoice.'
  //       this.style = 'text-decoration: none; color:black; cursor: auto';
  //     } else {
  //       this.afStorage.ref(this.id + '/' + this.id).getDownloadURL().subscribe( url =>this.downloadURL = url);
  //       this.urlText = 'Download invoice';
  //       this.style = 'text-decoration: underline; color:blue; cursor: pointer';
  //     }
  //   });
  // }

  format(date: string): string {
    let dateFormat = moment(date).format("Y/M/D HH:mm");
    return dateFormat;    
  }

  // ngOnDestroy() {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  checkState(state):string {
    if (state == "created") return "warning";
    if (state == "in progress") return "build";
    if (state == "completed") return "checkmark-circle";
  }

  return(): void {
    this.router.navigate(['/tasks']);
  }

  update(id: string): void {
    this.router.navigate(['/tasks/edit/' + id]);
  }

  delete(id: string) {
    if (window.confirm('Do you really want remove this task ?')) {
      this.taskSvc.deleteTask(id);
    }

    this.return();
  }

  // upload(event) {
  //   let file = event.target.files[0];
  //   this.ref = this.afStorage.ref(`${this.id}/${this.id}`);
  //   this.afTask = this.ref.put(file);
  //   this.uploadProgress = this.afTask.percentageChanges();
  // }

  // viewImage(url) {
  //   if(url === '') return;

  //   let newTab = window.open(url, '_black');
  //   newTab.focus();
  // }

  getErrorMessage(field: string): string {
    let message = '';
    if (this.priceForm.get(field)?.errors?.required) {
      message = 'You must enter a value';
    } else if (this.priceForm.get(field)?.hasError('min')) {
      message = 'You must enter a price greater than 0';
    }    
    return message;
  }

  isValidField(field: string) {
    this.getErrorMessage(field);
    return (
      (this.priceForm.get(field)?.touched || this.priceForm.get(field)?.dirty) &&
      !this.priceForm.get(field)?.valid
    );
  }

  generateInvoice() {
    let price = this.priceForm.value.price;

    let docDefinition = {  
      content: [  
        {  
          text: 'TALLERES JJ',  
          fontSize: 16,  
          alignment: 'center',  
          color: '#047886'  
        },  
        {  
          text: 'INVOICE',  
          fontSize: 20,  
          bold: true,  
          alignment: 'center',  
          decoration: 'underline',  
          color: 'skyblue'  
        },
        {  
          text: 'Customer Details',  
          style: 'sectionHeader'  
        },
        {  
          columns: [  
              [  
                  {  
                      text: 'Talleres JJ',  
                      bold: true, 
                      style: 'text'
                  },  
                  { text: 'Calle Carbonilla en el Inyector, 13', style: 'text'},  
                  { text: 'talleresjj@gmail.com', style: 'text' },  
                  { text: '+34 953 48 22 47', style: 'text' }  
              ],  
              [  
                  {  
                      text: `Date: ${new Date().toLocaleString()}`,  
                      alignment: 'right',
                      style: 'text'
                  },  
                  {  
                      text: `Bill: ${this.task.id}`,  
                      alignment: 'right',
                      style: 'text' 
                  }  
              ]  
          ]  
        }, 
        {  
          text: 'Order Details',  
          style: 'sectionHeader'  
        },
        {  
          table: {  
              headerRows: 1,  
              widths: ['*', '*', 'auto'],  
              body: [  
                  ['Vehicle', 'Service', 'Price'],
                  [this.task.title, this.task.description, price + '€'],
                  [ {text: 'Total Amount: ' , colSpan:2}, {} , price + '€'  ]
              ]  
          }  
        },
        {  
          text: 'Additional Details',  
          style: 'sectionHeader'  
        },
        {  
          columns: [  
              [
                { text: 'Observations: ' + this.task.observations, style: 'text' },
                { qr: `${this.task.id}`, fit: '100' }
              ]  
          ]  
        }, 
        {  
          text: 'Terms and condition',  
          style: 'sectionHeader'  
        }, 
        {  
          ul: [  
            'Order can be return in max 10 days.',  
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',  
            'This is system generated invoice.',  
          ],  
        },
        {  
          text: 'Signatures',  
          style: 'sectionHeader'  
        }, 
        {  
          columns: [
            [
              { text: 'Customer Sign', style: 'text' }
            ],
            [
              { text: 'Client Sign', style: 'text' }
            ]
          ]
        }
      ],
      styles: {  
        sectionHeader: {  
            bold: true,  
            decoration: 'underline',  
            fontSize: 14,  
            margin: [0, 20, 0, 15]  
        },
        text: {
          margin: [0,0,0,10]
        }
      }  
    }

    pdfMake.createPdf(docDefinition).download(this.task.id);  
  }

}

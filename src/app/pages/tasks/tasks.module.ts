import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TasksPageRoutingModule } from './tasks-routing.module';
import { TasksPage } from './tasks.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from 'src/app/components/tasks/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [
    TasksPage,
    TaskComponent
  ]
})
export class TasksPageModule {}

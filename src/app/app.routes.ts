import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Login } from './features/auth/login/login';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';
import { Dashboard } from './features/dashboard/dashboard';
import { Profile } from './features/profile/profile';
import { InstructorList } from './features/instructors/instructor-list/instructor-list';
import { InstructorDetail } from './features/instructors/instructor-detail/instructor-detail';
import { InstructorAdd } from './features/instructors/instructor-add/instructor-add';
import { TraineeList } from './features/trainees/trainee-list/trainee-list';
import { TraineeDetail } from './features/trainees/trainee-detail/trainee-detail';
import { TraineeAdd } from './features/trainees/trainee-add/trainee-add';
import { CenterList } from './features/centers/center-list/center-list';
import { CenterDetail } from './features/centers/center-detail/center-detail';

export const routes: Routes = [
    {path:''  , component:Landing},
    {path: 'login', component:Login},
    {
        path:'',
        component:MainLayout,
        canActivate:[authGuard],
        children:[
            {path:'dashboard' ,component:Dashboard },
            {path:'profile',component:Profile},
            {path:'instructors',component:InstructorList},
            {path:'instructors/add',component:InstructorAdd},
            {path:'instructors/:id',component:InstructorDetail},
            {path:'trainees',component:TraineeList},
            {path:'trainees/add',component:TraineeAdd},
            {path:'trainees/:id',component:TraineeDetail},
            {path:'centers',component:CenterList},
            {path:'centers/:id',component:CenterDetail},
        ] 
    },
    {path:'**', redirectTo:'dashboard'}
];

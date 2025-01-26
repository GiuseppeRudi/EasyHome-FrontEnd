import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {DialogService} from '../../service/dialog.service';

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;
  @ViewChild('registerDialog') registerDialog!: TemplateRef<any>;
  constructor(private dialogService: DialogService,private dialog: MatDialog, private http: HttpClient,private router: Router, private authService: AuthService) {}

  user = { firstName: '',lastName:'',birthdate:'',province:'',city:'',cap:'',id:'',confirmPassword:'',phoneNumber:'',address:'', email: '', password: '',gender:'' };

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogService.openDialog(this.authOptionsDialog);
    });
  }


  openDialogWithPrevent(event: Event, dialogTemplate: TemplateRef<any>) {
    event.preventDefault(); // Previene la navigazione
    this.closeDialog(); // Chiude il dialog precedente, se aperto
    this.dialog.open(dialogTemplate, {
      width: '400px',
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }

  registerUser() {
    this.http.post('http://localhost:4200/api/register', this.user).subscribe({
      next: (response) => alert(response),
      error: (err) => console.error('Errore:', err),
    });
  }


  login() {
    this.authService.login(this.user.email, this.user.password)
      .subscribe({
        next: () => {
          console.log("Logged User:", )
          this.router.navigate([  "/user-profile" ]);
        },
        error: (err) => console.error('Login failed', err),
      });
  }




}

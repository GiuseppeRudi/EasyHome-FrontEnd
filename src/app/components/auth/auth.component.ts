import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {DialogService} from '../../service/dialog.service';
import {UserRole} from '../../auth/user-role';

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @ViewChild('authOptionsDialog') authOptionsDialog!: TemplateRef<any>;
  @ViewChild('registerDialog') registerDialog!: TemplateRef<any>;

  constructor(private dialogService: DialogService, private dialog: MatDialog, private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  errorMessage: string = '';

  //user = { firstName: '',lastName:'',birthdate:'',province:'',city:'',cap:'',id:'',confirmPassword:'',phoneNumber:'',address:'', email: '', password: '',gender:'' };
  user = {username: '', password: ''};

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
    this.http.post('/api/register', this.user).subscribe({
      next: (response) => alert(response),
      error: (err) => console.error('Errore:', err),
    });
  }


  login() {
    this.authService.login(this.user.username, this.user.password)
      .subscribe({
        next: (response: any) => {
          console.log('Login effettuato con successo:', response);

          // Salva le informazioni dell'utente nel frontend (es. localStorage o variabili)
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);
          this.closeDialog();
          setTimeout(() => {
            // Reindirizza in base al ruolo
            if (response.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if(response.role=='ROLE_USER') {
              this.router.navigate(['/']);
            }
          }, 500); // Timeout di 500 ms
        },
        error: (err) => {
          console.error('Errore durante il login:', err);

          if (err.status === 401) {
            this.errorMessage = "Credenziali errate. Riprova.";
          } else {
            this.errorMessage = "Si è verificato un errore. Riprova più tardi.";
          }
          this.resetForm();
        }
      });
  }
  resetForm() {
    this.user = { username: '', password: '' };
  }
}

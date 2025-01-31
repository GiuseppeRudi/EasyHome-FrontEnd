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

  user = { firstName: '',lastName:'',birthdate: '',country:'', province:'',city:'',cap:'',id:'',phoneNumber:'',address:'', username: '', email: '', password: '',gender:'' };

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

  register() {
    this.authService.register(this.user.firstName, this.user.lastName, this.user.birthdate, this.user.country,this.user.username, this.user.email,this.user.password)
      .subscribe({
        next: (response: any) => {
          console.log('Registrazione effettuata con successo:', response);

          this.closeDialog();
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload(); // Ricarica la pagina per aggiornare i dati
            });
          }, 500);
        },
        error: (err) => {
          console.error('Errore durante la registrazione:', err);
          this.resetForm();
        }
      });
  }



  login() {
    this.authService.login(this.user.username, this.user.password)
      .subscribe({
        next: (response: any) => {
          console.log('Login effettuato con successo:', response);

          // Salva le informazioni dell'utente nel frontend (es. sessionStorag o variabili)
          sessionStorage.setItem('username', response.username);
          sessionStorage.setItem('role', response.role);
          this.closeDialog();
          setTimeout(() => {
            // Reindirizza o ricarica la pagina
            if (response.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']).then(() => {
                window.location.reload(); // Ricarica la pagina per aggiornare i dati
              });
            } else {
              this.router.navigate(['/']).then(() => {
                window.location.reload(); // Ricarica la pagina per aggiornare i dati
              });
            }
          }, 500);
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
    this.user = { firstName: '',lastName:'',birthdate: '',country:'', province:'',city:'',cap:'',id:'',phoneNumber:'',address:'', username: '', email: '', password: '',gender:'' };
  }
}

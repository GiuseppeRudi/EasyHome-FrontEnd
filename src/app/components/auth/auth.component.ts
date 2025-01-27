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
  constructor(private dialogService: DialogService,private dialog: MatDialog, private http: HttpClient,private router: Router, private authService: AuthService) {}
  errorMessage: string = '';

  //user = { firstName: '',lastName:'',birthdate:'',province:'',city:'',cap:'',id:'',confirmPassword:'',phoneNumber:'',address:'', email: '', password: '',gender:'' };
  user = { username: '',password:'',role: UserRole.USER};

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
    this.authService.login(this.user.username, this.user.password, this.user.role).subscribe({
      next: (response) => {
        this.errorMessage = ''; // Reset messaggio errore
        console.log('Login effettuato con successo:', response);
        this.closeDialog();
        setTimeout(() => {
          this.router.navigate(['/']); // Cambia il percorso in base alle tue esigenze
        }, 500);
      },
      error: (err) => {
        console.error('Errore durante il login:', err);
        if (err.status === 401) {
          this.errorMessage = 'Credenziali errate. Riprova.';
        } else {
          this.errorMessage = 'Si è verificato un errore. Riprova più tardi.';
        }
        this.resetForm(); // Reset dei campi del modulo
      },
    });
  }

  resetForm() {
    this.user = { username: '', password: '', role: UserRole.USER };
  }



  protected readonly UserRole = UserRole;
}

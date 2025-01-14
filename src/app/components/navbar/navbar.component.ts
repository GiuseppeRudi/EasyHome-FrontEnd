import {Component} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
    { label: 'Home', icon: 'home', route: '/' },
    { label: 'About', icon: 'info', route: '/about' },
    { label: 'Services', icon: 'build', route: '/services' },
    { label: 'Contact', icon: 'contact_mail', route: '/contact' },
  ];

  onMenuClick(item: any) {
    console.log(`Navigating to ${item.route}`);
  }
}

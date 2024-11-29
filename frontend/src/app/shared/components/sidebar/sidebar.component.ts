import { Component } from '@angular/core';
import { SidebarModule } from '@coreui/angular';
import { SidebarBrandComponent, SidebarHeaderComponent, SidebarNavComponent } from '@coreui/angular';
import { navItems } from '../_nav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, SidebarHeaderComponent, SidebarNavComponent, SidebarBrandComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public navItems = navItems;
}

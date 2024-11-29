import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent, GridModule } from '@coreui/angular';
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContainerComponent, SidebarComponent, GridModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}

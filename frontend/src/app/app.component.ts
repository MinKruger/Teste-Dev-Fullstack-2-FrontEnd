import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  ContainerComponent,
  GridModule,
  SidebarModule,
  SidebarBrandComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './shared/icons/icon-subset';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { DefaultFooterComponent } from './shared/components/default-footer/default-footer.component';
import { DefaultHeaderComponent } from './shared/components/default-header/default-header.component';
import { navItems } from './shared/components/_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerComponent,
    GridModule,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    SidebarModule,
    SidebarNavComponent,
    DefaultHeaderComponent,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Teste FullStack - Litoral';

  public navItems = navItems;

  readonly #router = inject(Router);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #iconSetService = inject(IconSetService);
  readonly #titleService = inject(Title);

  constructor() {
    this.#titleService.setTitle(this.title);
    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.#router.events
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
      });
  }
}

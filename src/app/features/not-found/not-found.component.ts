import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <a routerLink="/dashboard">Go to Dashboard</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;

      h1 {
        font-size: 5rem;
        color: #3f51b5;
        margin: 0;
      }

      p {
        color: #666;
        font-size: 1.2rem;
        margin: 0.5rem 0 1.5rem;
      }

      a {
        color: #3f51b5;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border: 1px solid #3f51b5;
        border-radius: 4px;

        &:hover { background: #e8eaf6; }
      }
    }
  `]
})
export class NotFoundComponent {}
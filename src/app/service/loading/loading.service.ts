// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  mostrarLoading() {
    this.loadingSubject.next(true);
  }

  ocultarLoading() {
    this.loadingSubject.next(false);
  }

  mostrarLoadingConDelay(delay: number = 1000) {
    this.mostrarLoading();
    // Ocultar el loading después del delay
    setTimeout(() => {
      this.ocultarLoading();
    }, delay);
  }
}

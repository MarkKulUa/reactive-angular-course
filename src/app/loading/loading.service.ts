import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {concatMap, finalize, tap} from 'rxjs/operators';


@Injectable()
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this._loading$.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        concatMap(() => obs$),
        finalize(() => this.loadingOff()),
      )
  }

  loadingOn() {
    this._loading$.next(true);
  }

  loadingOff() {
    this._loading$.next(false);
  }

  setLoading(value: boolean) {
    this._loading$.next(value);
  }
}

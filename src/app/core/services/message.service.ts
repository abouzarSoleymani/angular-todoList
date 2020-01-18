import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  showMessage(body: string, title?: string): void {
    this.snackBar.open(body, title, {
      duration: 3000
    });
  }

  showErrorMessage(body: string, title?: string): void {
    this.snackBar.open(body, title, {
      duration: 3000,
      panelClass: 'warn-snack'
    });
  }

  showErrorIfExists(response: any) {
    if (response.result && response.result.message) {
      this.showErrorMessage(response.result.message);
    }
  }
}

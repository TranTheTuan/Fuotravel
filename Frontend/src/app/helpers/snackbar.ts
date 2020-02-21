import { MatSnackBar} from '@angular/material/snack-bar';

export function openSnackbar(message: string, snackBar: MatSnackBar) {
  snackBar.open(message, null, {duration: 3000});
}

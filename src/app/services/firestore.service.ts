import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto asegura que el servicio esté disponible en toda la app
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getDatos(): Observable<any[]> {
    const ref = collection(this.firestore, 'usuarios'); // Usa el nombre correcto de tu colección
    return collectionData(ref, { idField: 'id' });
  }
}

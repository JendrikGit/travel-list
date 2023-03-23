import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { BehaviorSubject } from 'rxjs';
import { destinationsSchema } from '../core/schemas/destination-schema.model';
import { IDestination } from '../models/destination.interface';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private readonly databaseKey: string = 'destinations';

  /**
   * Database that holds destinations.
   */
  private database: RxDatabase | undefined;
  private collection: { destinations: RxCollection } | undefined;

  constructor() { 
    this.setupDatabase();
  }

  private async setupDatabase(): Promise<void> {
    // Creates new database.
    this.database = await createRxDatabase({
      name: this.databaseKey,
      storage: getRxStorageDexie()
    });

    // Creates collection in the database with given schema.
    this.collection = await this.database.addCollections({
      destinations: {
        schema: destinationsSchema
      }
    });
  }

  /**
   * Adds new destination to database.
   * @param destination
   */
  public async addDestination(destination: IDestination): Promise<void> {
    await this.database![this.databaseKey].insert(destination);
  }

  /**
   * Gets destinations that are not marked as done.
   * @returns
   */
  public getUpcomingDestinations(): BehaviorSubject<any[]> {
    return this.database![this.databaseKey].find({
      selector: {
        done: {
          $eq: false
        }
      }
    }).$; 
  }

  /**
   * Gets destinations that are marked as done.
   * @returns
   */
  public getPastDestinations(): BehaviorSubject<any[]> {
    return this.database![this.databaseKey].find({
      selector: {
        done: {
          $eq: true
        }
      }
    }).$; 
  }
}
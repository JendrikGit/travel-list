import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { BehaviorSubject } from 'rxjs';
import { destinationsSchema } from '../core/schemas/destination-schema.model';
import { IDestination } from '../models/destination.interface';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { ITag } from '../models/tag.interface';
import { IList } from '../models/list.interface';
addRxPlugin(RxDBUpdatePlugin);
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
   * Deletes destination from database.
   * @param destination
   */
  public async deleteDestination(destination: IDestination): Promise<void> {
    let query = this.collection?.destinations.find({
      selector: {
        id: {
          $eq: destination.id
        }
      }
    })
    await query?.remove();
  }
  /**
   * Marks destination as completed.
   * @param destination
   */
  public async completeDestination(destination: IDestination, completed: boolean): Promise<void> {
    let query = this.collection?.destinations.find({
      selector: {
        id: {
          $eq: destination.id
        }
      }
    })
    await query?.update({
      $set: {
        done: completed
      }
    });
  }
  /**
   * Sets tag for the destination
   * @param destination
   */
  public async setTag(destination: IDestination, tag: ITag): Promise<void> {
    let query = this.collection?.destinations.find({
      selector: {
        id: {
          $eq: destination.id
        }
      }
    })
    await query?.update({
      $set: {
        tag: tag
      }
    });
  }
  /**
   * Sets list for the destination
   * @param destination
   */
  public async setList(destination: IDestination, list: IList): Promise<void> {
    let query = this.collection?.destinations.find({
      selector: {
        id: {
          $eq: destination.id
        }
      }
    })
    await query?.update({
      $set: {
        list: list
      }
    });
  }
  /**
   * Sets notes for the destination
   * @param destination
   */
  public async setNotes(destination: IDestination, notes: string): Promise<void> {
    let query = this.collection?.destinations.find({
      selector: {
        id: {
          $eq: destination.id
        }
      }
    })
    await query?.update({
      $set: {
        notes: notes
      }
    });
  }
  /**
   * Gets destinations that are not marked as done.
   * @returns
   */
public getUpcomingDestinations(type: string | undefined = undefined, id: string | undefined = undefined): BehaviorSubject<any[]> {  
    return this.database![this.databaseKey].find({
      selector: {
        done: {
          $eq: false
        }
 },
      sort: [
        { createdAt: 'desc' }
      ]
    }).$; 
  }

  /**
   * Gets destinations that are marked as done.
   * @returns
   */
public getPastDestinations(type: string | undefined = undefined, id: string | undefined = undefined): BehaviorSubject<any[]> {
    return this.database![this.databaseKey].find({
      selector: {
        done: {
          $eq: true
        }
  },
      sort: [
        { createdAt: 'desc' }
      ]
    }).$; 
  }
}